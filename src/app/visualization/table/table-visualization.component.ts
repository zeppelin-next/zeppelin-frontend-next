import { Component, OnInit, Inject } from '@angular/core';
import { TableData } from '../dataset/table-data';
import { Visualization } from '../visualization';
import { VISUALIZATION } from '../visualization-component-portal';

@Component({
  selector: 'zeppelin-visualization-table-visualization',
  templateUrl: './table-visualization.component.html',
  styleUrls: ['./table-visualization.component.less']
})
export class TableVisualizationComponent implements OnInit {
  tableData: TableData;

  constructor(@Inject(VISUALIZATION) public visualization: Visualization) {}

  ngOnInit() {
    this.tableData = this.visualization.tableData;
  }
}
