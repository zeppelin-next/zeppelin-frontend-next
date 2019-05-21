import { TableData } from './dataset/table-data';
import { Setting, Transformation } from './transformation';
import { DataSet } from '@antv/data-set';

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

    let key = '';
    if (config.keys && config.keys[0]) {
      key = config.keys[0].name;
    }
    const fields = config.values.map(k => k.name);

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
        fields: fields,
        operations: config.values.map(v => (v.aggr === 'avg' ? 'mean' : v.aggr)),
        as: config.values.map(v => `${v.name}(${v.aggr})`),
        groupBy: [...config.keys.map(e => e.name), ...config.groups.map(e => e.name)]
      });

      dv.transform({
        type: 'fill-rows',
        groupBy: config.groups.map(e => e.name),
        orderBy: config.keys.map(e => e.name),
        fillBy: 'order'
      });

      config.values
        .map(v => `${v.name}(${v.aggr})`)
        .forEach(field => {
          dv.transform({
            field,
            type: 'impute',
            groupBy: config.keys.map(e => e.name),
            method: 'value',
            value: config.mode === 'stackedAreaChart' ? 0 : null
          });
        });
    }

    dv.transform({
      type: 'fold',
      fields: config.values.map(v => (config.mode !== 'scatterChart' ? `${v.name}(${v.aggr})` : v.name)),
      key: '__key__',
      value: '__value__'
    });

    dv.transform({
      type: 'partition',
      groupBy: config.groups.map(e => e.name)
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
      (a, b) => dv.origin.findIndex(o => o[key] === a[key]) - dv.origin.findIndex(o => o[key] === b[key])
    );

    dv = ds.createView().source(groupsData);

    if (config.mode === 'stackedAreaChart' || config.mode === 'pieChart') {
      dv.transform({
        type: 'percent',
        field: '__value__',
        dimension: '__key__',
        groupBy: config.keys.map(e => e.name),
        as: '__percent__'
      });
    }

    return dv;
  }
}
