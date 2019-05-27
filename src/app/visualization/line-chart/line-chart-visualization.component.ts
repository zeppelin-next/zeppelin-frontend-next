import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Inject,
  AfterViewInit
} from '@angular/core';
import * as G2 from '@antv/g2';
import { GraphConfig } from 'zeppelin-sdk';
import { setChartXAxis } from '../common/util/set-x-axis';
import { Visualization } from '../visualization';
import { VISUALIZATION } from '../visualization-component-portal';

@Component({
  selector: 'zeppelin-line-chart-visualization',
  templateUrl: './line-chart-visualization.component.html',
  styleUrls: ['./line-chart-visualization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartVisualizationComponent implements OnInit, AfterViewInit {
  @ViewChild('graphEle') graphEle: ElementRef<HTMLDivElement>;
  @ViewChild('sliderEle') sliderEle: ElementRef<HTMLDivElement>;
  config: GraphConfig;
  forceY = false;
  lineWithFocus = false;
  isDateFormat = false;
  dateFormat = '';
  transformed;
  chart: G2.Chart;

  settingChange(): void {
    const setting = this.config.setting.lineChart;
    setting.lineWithFocus = this.lineWithFocus;
    setting.forceY = this.forceY;
    setting.isDateFormat = this.isDateFormat;
    setting.dateFormat = this.dateFormat;
    console.log(setting);
    this.visualization.configChange$.next(this.config);
  }

  constructor(@Inject(VISUALIZATION) public visualization: Visualization) {}

  ngOnInit() {
    this.transformed = this.visualization.transformed;
  }

  ngAfterViewInit() {
    this.chart = new G2.Chart({
      forceFit: true,
      container: this.graphEle.nativeElement
    });
    this.config = this.visualization.getConfig();
    const setting = this.config.setting.lineChart;
    this.forceY = setting.forceY || false;
    this.lineWithFocus = setting.lineWithFocus || false;
    this.isDateFormat = setting.isDateFormat || false;
    this.dateFormat = setting.dateFormat || '';

    let key = '';
    if (this.config.keys && this.config.keys[0]) {
      key = this.config.keys[0].name;
    }

    this.chart.source(this.transformed);

    this.chart
      .line()
      .position(`${key}*__value__`)
      .color('__key__');
    this.chart.legend({
      position: 'top-right'
      // tslint:disable-next-line
    } as any);
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

    this.chart.render();

    if (setting.lineWithFocus) {
      // tslint:disable-next-line
      (this.chart as any).interact('brush');
    }
  }
}
