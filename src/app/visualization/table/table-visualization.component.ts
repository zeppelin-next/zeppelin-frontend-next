import { Component, OnInit, Inject, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd';
import { WorkSheet, utils, writeFile } from 'xlsx';
import { TableData } from '../dataset/table-data';
import { Visualization } from '../visualization';
import { VISUALIZATION } from '../visualization-component-portal';
import { orderBy, filter, sumBy, minBy, maxBy } from 'lodash';

type ColType = 'string' | 'date' | 'number';
type AggregationType = 'count' | 'sum' | 'min' | 'max' | 'avg';

class FilterOption {
  sort: 'desc' | 'asc' | '' = '';
  type: ColType = 'string';
  visible = true;
  pinned?: string;
  term = '';
  width: string | '*' = '*';
  aggregation: AggregationType | null = null;
  aggregationValue: number | null = null;
}

function typeCoercion(value: string, type: ColType): string | number | Date {
  switch (type) {
    case 'number':
      const number = Number.parseFloat(value);
      return Number.isNaN(number) ? value : number;
    case 'date':
      const date = new Date(value);
      return Number.isNaN(date.valueOf()) ? value : date;
    default:
      return value;
  }
}

@Component({
  selector: 'zeppelin-visualization-table-visualization',
  templateUrl: './table-visualization.component.html',
  styleUrls: ['./table-visualization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableVisualizationComponent implements OnInit {
  tableData: TableData;
  // tslint:disable-next-line:no-any
  rows: any[] = [];
  columns: string[] = [];
  colOptions = new Map<string, FilterOption>();
  types: ColType[] = ['string', 'number', 'date'];
  aggregations: AggregationType[] = ['count', 'sum', 'min', 'max', 'avg'];
  @ViewChild(NzTableComponent) nzTable: NzTableComponent;

  exportFile(type: 'csv' | 'xlsx', all = true) {
    const wb = utils.book_new();
    let ws: WorkSheet;
    if (all) {
      ws = utils.json_to_sheet(this.rows);
    } else {
      ws = utils.json_to_sheet(this.nzTable.data);
    }
    utils.book_append_sheet(wb, ws, 'Sheet1');
    writeFile(wb, `export.${type}`);
  }

  onChangeType(type: ColType, col: string) {
    const opt = this.colOptions.get(col);
    opt.type = type;
    this.filterRows();
    this.aggregate();
  }

  onChangeAggregation(aggregation: AggregationType, col: string) {
    const opt = this.colOptions.get(col);
    opt.aggregation = opt.aggregation === aggregation ? null : aggregation;
    this.aggregate();
  }

  onSearch(): void {
    this.filterRows();
  }

  onSortChange(type: 'descend' | 'ascend' | string, key: string): void {
    const opt: FilterOption = this.colOptions.get(key);
    this.colOptions.delete(key);
    if (type) {
      opt.sort = type === 'descend' ? 'desc' : 'asc';
    } else {
      opt.sort = '';
    }
    this.colOptions.set(key, opt);
    this.filterRows();
  }

  aggregate() {
    this.colOptions.forEach((opt, key) => {
      const numValue = row => {
        const value = typeCoercion(row[key], opt.type);
        if (typeof value === 'number') {
          return value;
        }
        if (value instanceof Date) {
          return value.valueOf();
        }
        return value;
      };
      const getSum = () =>
        sumBy(this.tableData.rows, row => {
          const value = typeCoercion(row[key], 'number');
          return typeof value === 'number' ? value : 0;
        });

      switch (opt.aggregation) {
        case 'sum':
          opt.aggregationValue = getSum();
          break;
        case 'avg':
          opt.aggregationValue = getSum() / this.tableData.rows.length;
          break;
        case 'count':
          opt.aggregationValue = this.tableData.rows.length;
          break;
        case 'max':
          opt.aggregationValue = maxBy(this.tableData.rows, numValue)[key];
          break;
        case 'min':
          opt.aggregationValue = minBy(this.tableData.rows, numValue)[key];
          break;
        default:
          opt.aggregationValue = null;
      }
    });
  }

  filterRows() {
    const sortKeys = [];
    const sortTypes = [];
    const terms = [];
    this.colOptions.forEach((value, key) => {
      if (value.sort) {
        sortKeys.push(row => typeCoercion(row[key], value.type));
        sortTypes.push(value.sort);
      }
      terms.push(row => String(row[key]).search(value.term) !== -1);
    });
    this.rows = filter(this.tableData.rows, row => terms.every(term => term(row)));
    this.rows = orderBy(this.rows, sortKeys, sortTypes);
    this.cdr.markForCheck();
  }

  constructor(@Inject(VISUALIZATION) public visualization: Visualization, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.tableData = this.visualization.transformed;
    this.columns = this.tableData.columns;
    this.rows = [...this.tableData.rows];
    this.columns.forEach(col => {
      this.colOptions.set(col, new FilterOption());
    });
  }
}