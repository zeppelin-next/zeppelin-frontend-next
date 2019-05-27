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
  selector: 'zeppelin-area-chart-visualization',
  templateUrl: './area-chart-visualization.component.html',
  styleUrls: ['./area-chart-visualization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaChartVisualizationComponent implements OnInit, AfterViewInit {
  @ViewChild('graphEle') graphEle: ElementRef<HTMLDivElement>;
  transformed;
  chart: G2.Chart;
  style: 'stream' | 'expand' | 'stack' = 'stack';
  config: GraphConfig;

  constructor(@Inject(VISUALIZATION) public visualization: Visualization) {}

  viewChange() {
    this.config.setting.stackedAreaChart.style = this.style;
    this.visualization.configChange$.next(this.config);
  }

  ngOnInit() {
    this.transformed = this.visualization.transformed;
  }

  ngAfterViewInit(): void {
    this.chart = new G2.Chart({
      forceFit: true,
      container: this.graphEle.nativeElement
    });

    this.config = this.visualization.getConfig();
    this.style = this.config.setting.stackedAreaChart.style;
    let key = '';
    if (this.config.keys && this.config.keys[0]) {
      key = this.config.keys[0].name;
    }

    this.chart.source(this.transformed);
    this.chart.scale(key, {
      type: 'cat'
    });

    if (this.style === 'stack') {
      // area:stack
      this.chart
        .areaStack()
        .position(`${key}*__value__`)
        .color('__key__');
    } else if (this.style === 'stream') {
      // area:stream
      this.chart
        .area()
        .position(`${key}*__value__`)
        .adjust(['stack', 'symmetric'])
        .color('__key__');
    } else {
      // area:percent
      this.chart
        .areaStack()
        .position(`${key}*__percent__`)
        .color('__key__');
    }

    setChartXAxis(this.visualization, 'stackedAreaChart', this.chart, key);

    this.chart.render();
  }
}
