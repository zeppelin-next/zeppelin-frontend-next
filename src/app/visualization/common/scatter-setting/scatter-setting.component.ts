import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { GraphConfig } from 'zeppelin-sdk';
import { TableData } from '../../dataset/table-data';
import { Visualization } from '../../visualization';

@Component({
  selector: 'zeppelin-visualization-scatter-setting',
  templateUrl: './scatter-setting.component.html',
  styleUrls: ['./scatter-setting.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualizationScatterSettingComponent implements OnInit {
  @Input() visualization: Visualization;

  tableData: TableData;
  config: GraphConfig;
  columns = [];

  field = {
    xAxis: [],
    yAxis: [],
    group: [],
    size: []
  };

  // tslint:disable-next-line
  drop(event: CdkDragDrop<any[]>) {
    this.clean(event.container.data, false);
    event.container.data.push(event.previousContainer.data[event.previousIndex]);
    this.cdr.markForCheck();
    this.updateConfig();
  }

  // tslint:disable-next-line
  clean(data: any[], update = true): void {
    while (data.length > 0) {
      data.splice(0, 1);
    }
    if (update) {
      this.updateConfig();
    }
    this.cdr.markForCheck();
  }

  noReturnPredicate() {
    return false;
  }

  updateConfig() {
    const scatterSetting = this.config.setting.scatterChart;
    scatterSetting.xAxis = this.field.xAxis[0];
    scatterSetting.yAxis = this.field.yAxis[0];
    scatterSetting.size = this.field.size[0];
    scatterSetting.group = this.field.group[0];
    this.visualization.configChange$.next(this.config);
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.tableData = this.visualization.getTransformation().getTableData() as TableData;
    this.config = this.visualization.getConfig();
    this.columns = this.tableData.columns.map((name, index) => ({
      name,
      index,
      aggr: 'sum'
    }));

    const { xAxis, yAxis, group, size } = this.config.setting.scatterChart;

    const arrayWrapper = value => (value ? [value] : []);
    this.field.xAxis = arrayWrapper(xAxis);
    this.field.yAxis = arrayWrapper(yAxis);
    this.field.group = arrayWrapper(group);
    this.field.size = arrayWrapper(size);
  }
}
