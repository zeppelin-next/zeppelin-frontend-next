import { TableData } from './dataset/table-data';
import { Setting, Transformation } from './transformation';
import { DataSet } from '@antv/data-set';
import { get } from 'lodash';

// tslint:disable-next-line:no-any
export class PivotTransformation extends Transformation {
  constructor(config) {
    super(config);
  }

  getSetting(): Setting {
    return undefined;
  }

  // tslint:disable-next-line:no-any
  transform(tableData: TableData): any {
    const config = this.getConfig();
    const ds = new DataSet();
    let dv = ds.createView().source(tableData.rows);

    let firstKey = '';
    if (config.keys && config.keys[0]) {
      firstKey = config.keys[0].name;
    }
    let keys = [];
    let groups = [];
    let values = [];
    let aggregates = [];
    if (config.mode !== 'scatterChart') {
      keys = config.keys.map(e => e.name);
      groups = config.groups.map(e => e.name);
      values = config.values.map(v => `${v.name}(${v.aggr})`);
      aggregates = config.values.map(v => (v.aggr === 'avg' ? 'mean' : v.aggr));
    } else {
      keys = [get(config.setting.scatterChart.xAxis, 'name')];
      values = [get(config.setting.scatterChart.yAxis, 'name')];
      groups = [get(config.setting.scatterChart.group, 'name')];
    }

    dv.transform({
      type: 'map',
      callback: row => {
        Object.keys(row).forEach(k => {
          if (config.keys.map(e => e.name).indexOf(k) === -1) {
            const numberValue = Number.parseFloat(row[k]);
            row[k] = Number.isFinite(numberValue) ? numberValue : row[k];
          }
        });
        return row;
      }
    });

    if (config.mode !== 'scatterChart') {
      dv.transform({
        type: 'aggregate',
        fields: config.values.map(v => v.name),
        operations: aggregates,
        as: values,
        groupBy: [...keys, ...groups]
      });

      dv.transform({
        type: 'fill-rows',
        groupBy: groups,
        orderBy: keys,
        fillBy: 'order'
      });

      config.values
        .map(v => `${v.name}(${v.aggr})`)
        .forEach(field => {
          dv.transform({
            field,
            type: 'impute',
            groupBy: keys,
            method: 'value',
            value: config.mode === 'stackedAreaChart' ? 0 : null
          });
        });
    }

    dv.transform({
      type: 'fold',
      fields: values,
      key: '__key__',
      value: '__value__'
    });

    dv.transform({
      type: 'partition',
      groupBy: groups
    });

    const groupsData = [];
    Object.keys(dv.rows).forEach(groupKey => {
      dv.rows[groupKey].forEach(row => {
        groupsData.push({
          ...row,
          __key__: `${row['__key__']}.${groupKey}`
        });
      });
    });

    groupsData.sort(
      (a, b) =>
        dv.origin.findIndex(o => o[firstKey] === a[firstKey]) - dv.origin.findIndex(o => o[firstKey] === b[firstKey])
    );

    dv = ds
      .createView({
        state: {
          filterData: null
        }
      })
      .source(groupsData);

    if (config.mode === 'stackedAreaChart' || config.mode === 'pieChart') {
      dv.transform({
        type: 'percent',
        field: '__value__',
        dimension: '__key__',
        groupBy: keys,
        as: '__percent__'
      });
    }
    return dv;
  }
}
