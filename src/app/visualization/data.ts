// import { GraphConfig } from './config';

const res = `{
  "type": "TABLE",
  "data": "month\\tTokyo\\tLondon\\tGroup\\nJan\\t7\\t3.9\\tB\\nFeb\\t6.9\\t4.2\\tB\\nMar\\t9.5\\t5.7\\tA\\nApr\\t14.5\\t8.5\\tA\\nMay\\t18.4\\t11.9\\tA\\nMay\\t20\\t15.9\\tA\\nJun\\t21.5\\t15.2\\tA\\nJul\\t25.2\\t17\\tB\\nAug\\t26.5\\t16.6\\tB\\nAug\\t23.3\\t15\\tB\\nSep\\t23.3\\t14.2\\tB\\nSep\\t25\\t16.5\\tB\\nOct\\t18.3\\t10.3\\tB\\nNov\\t13.9\\t6.6\\tB\\nDec\\t9.6\\t4.8\\tB\\n"
}`;

export const tableData = JSON.parse(res).data;

export const graphConfig = {
  // "mode": "pieChart",
  mode: 'lineChart',
  // "mode": "scatterChart",
  height: 300,
  optionOpen: true,
  setting: {
    table: {
      tableGridState: {
        columns: [
          {
            name: 'index0',
            visible: true,
            width: '*',
            sort: {},
            filters: [{}],
            pinned: ''
          },
          {
            name: 'value1',
            visible: true,
            width: '*',
            sort: {},
            filters: [{}],
            pinned: ''
          },
          {
            name: 'random2',
            visible: true,
            width: '*',
            sort: {},
            filters: [{}],
            pinned: ''
          },
          {
            name: 'count3',
            visible: true,
            width: '*',
            sort: {},
            filters: [{}],
            pinned: ''
          }
        ],
        scrollFocus: {},
        selection: [],
        grouping: {
          grouping: [],
          aggregations: [],
          rowExpandedStates: {}
        },
        treeView: {},
        pagination: {
          paginationCurrentPage: 1,
          paginationPageSize: 250
        }
      },
      tableColumnTypeState: {
        updated: false,
        names: {
          index: 'string',
          value: 'string',
          random: 'string',
          count: 'string'
        }
      },
      updated: false,
      initialized: false,
      tableOptionSpecHash:
        '[{"name":"useFilter","valueType":"boolean","defaultValue":false,"widget":"checkbox","description":"Enable filter for columns"},{"name":"showPagination","valueType":"boolean","defaultValue":false,"widget":"checkbox","description":"Enable pagination for better navigation"},{"name":"showAggregationFooter","valueType":"boolean","defaultValue":false,"widget":"checkbox","description":"Enable a footer for displaying aggregated values"}]',
      tableOptionValue: {
        useFilter: false,
        showPagination: false,
        showAggregationFooter: false
      }
    },
    lineChart: {
      rotate: {
        degree: '-45'
      },
      xLabelStatus: 'default',
      forceY: false,
      lineWithFocus: false,
      isDateFormat: false
    },
    stackedAreaChart: {
      rotate: {
        degree: '-45'
      },
      xLabelStatus: 'default'
    },
    multiBarChart: {
      rotate: {
        degree: '-45'
      },
      xLabelStatus: 'default'
    },
    scatterChart: {
      xAxis: {
        name: 'index',
        index: 0,
        aggr: 'sum'
      },
      yAxis: {
        name: 'random',
        index: 2,
        aggr: 'sum'
      },
      group: {
        name: 'index',
        index: 0,
        aggr: 'sum'
      },
      size: {
        name: 'value',
        index: 1,
        aggr: 'sum'
      }
    }
  },
  keys: [
    {
      name: 'month',
      index: 0,
      aggr: 'sum'
    }
  ],
  groups: [
    {
      name: 'Group',
      index: 3,
      aggr: 'sum'
    }
  ],
  values: [
    {
      name: 'Tokyo',
      index: 1,
      aggr: 'sum'
    },
    {
      name: 'London',
      index: 2,
      aggr: 'sum'
    },
    {
      name: 'London',
      index: 2,
      aggr: 'min'
    }
  ],
  commonSetting: {}
};
