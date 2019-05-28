import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { GraphConfig, XAxisSetting } from 'zeppelin-sdk';
import { Visualization } from '../../visualization';

type XLabelStatus = 'default' | 'rotate' | 'hide';

@Component({
  selector: 'zeppelin-visualization-x-axis-setting',
  templateUrl: './x-axis-setting.component.html',
  styleUrls: ['./x-axis-setting.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualizationXAxisSettingComponent implements OnInit {
  @Input() visualization: Visualization;
  @Input() mode: 'lineChart' | 'multiBarChart' | 'stackedAreaChart';

  setting: XAxisSetting;
  config: GraphConfig;
  xLabelStatus: XLabelStatus = 'default';
  degree = '-45';
  previousDegree: string;
  constructor() {}

  onStatusChange() {
    this.setting.xLabelStatus = this.xLabelStatus;
    this.updateConfig();
  }

  onDegreeChange() {
    if (this.degree === this.previousDegree) {
      return;
    }
    const degree = Number.parseInt(this.degree, 10);
    if (Number.isNaN(degree)) {
      this.degree = this.previousDegree;
      return;
    } else {
      this.degree = `${degree}`;
      this.previousDegree = this.degree;
    }
    this.updateConfig();
  }

  updateConfig() {
    this.setting.rotate.degree = this.degree;
    this.setting.xLabelStatus = this.xLabelStatus;
    this.visualization.configChange$.next(this.config);
  }

  ngOnInit() {
    this.config = this.visualization.getConfig();
    this.setting = this.config.setting[this.mode];
    this.xLabelStatus = this.setting.xLabelStatus;
    this.degree = this.setting.rotate.degree;
    this.previousDegree = this.degree;
  }
}