import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Inject,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import * as G2 from '@antv/g2';
import { GraphConfig } from 'zeppelin-sdk';
import { VisualizationPivotSettingComponent } from '../common/pivot-setting/pivot-setting.component';
import { setChartXAxis } from '../common/util/set-x-axis';
import { VisualizationXAxisSettingComponent } from '../common/x-axis-setting/x-axis-setting.component';
import { G2VisualizationComponentBase } from '../g2-visualization-component-base';
import { Visualization } from '../visualization';
import { VISUALIZATION } from '../visualization-component-portal';

@Component({
  selector: 'zeppelin-line-chart-visualization',
  templateUrl: './line-chart-visualization.component.html',
  styleUrls: ['./line-chart-visualization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartVisualizationComponent extends G2VisualizationComponentBase implements OnInit, AfterViewInit {
  @ViewChild('container') container: ElementRef<HTMLDivElement>;
  @ViewChild(VisualizationXAxisSettingComponent) xAxisSettingComponent: VisualizationXAxisSettingComponent;
  @ViewChild(VisualizationPivotSettingComponent) pivotSettingComponent: VisualizationPivotSettingComponent;
  forceY = false;
  lineWithFocus = false;
  isDateFormat = false;
  dateFormat = '';

  settingChange(): void {
    const setting = this.config.setting.lineChart;
    setting.lineWithFocus = this.lineWithFocus;
    setting.forceY = this.forceY;
    setting.isDateFormat = this.isDateFormat;
    setting.dateFormat = this.dateFormat;
    this.visualization.configChange$.next(this.config);
  }

  constructor(@Inject(VISUALIZATION) public visualization: Visualization, private cdr: ChangeDetectorRef) {
    super(visualization);
  }

  ngOnInit() {}

  refreshSetting() {
    const setting = this.config.setting.lineChart;
    this.forceY = setting.forceY || false;
    this.lineWithFocus = setting.lineWithFocus || false;
    this.isDateFormat = setting.isDateFormat || false;
    this.dateFormat = setting.dateFormat || '';
    this.pivotSettingComponent.init();
    this.xAxisSettingComponent.init();
    this.cdr.markForCheck();
  }

  renderBefore() {
    const key = this.getKey();
    const setting = this.config.setting.lineChart;
    this.chart
      .line()
      .position(`${key}*__value__`)
      .color('__key__');
    setChartXAxis(this.visualization, 'lineChart', this.chart, key);

    if (setting.isDateFormat) {
      this.chart.scale({
        [key]: {
          type: 'time',
          mask: setting.dateFormat || 'YYYY-MM-DD'
        }
      });
    }

    if (setting.forceY) {
      this.chart.scale({
        __value__: {
          min: 0
        }
      });
    }
  }

  renderAfter() {
    const setting = this.config.setting.lineChart;
    if (setting.lineWithFocus) {
      // tslint:disable-next-line
      (this.chart as any).interact('brush');
    } else {
      // tslint:disable-next-line:no-any
      (this.chart as any).clearInteraction();
    }
  }

  ngAfterViewInit() {
    this.render();
  }
}
