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
  selector: 'zeppelin-bar-chart-visualization',
  templateUrl: './bar-chart-visualization.component.html',
  styleUrls: ['./bar-chart-visualization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartVisualizationComponent implements OnInit, AfterViewInit {
  @ViewChild('graphEle') graphEle: ElementRef<HTMLDivElement>;
  transformed;
  chart: G2.Chart;
  stacked = false;
  config: GraphConfig;

  viewChange() {
    this.config.setting.multiBarChart.stacked = this.stacked;
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
    this.stacked = this.config.setting.multiBarChart.stacked;
    let key = '';
    if (this.config.keys && this.config.keys[0]) {
      key = this.config.keys[0].name;
    }

    this.chart.source(this.transformed);
    this.chart.scale(key, {
      type: 'cat'
    });

    if (this.config.setting.multiBarChart.stacked) {
      this.chart
        .intervalStack()
        .position(`${key}*__value__`)
        .color('__key__')
        .opacity(1);
    } else {
      this.chart
        .interval()
        .position(`${key}*__value__`)
        .color('__key__')
        .opacity(1)
        .adjust([
          {
            type: 'dodge',
            marginRatio: 0
          }
        ]);
    }
    setChartXAxis(this.visualization, 'multiBarChart', this.chart, key);

    this.chart.render();
  }
}
