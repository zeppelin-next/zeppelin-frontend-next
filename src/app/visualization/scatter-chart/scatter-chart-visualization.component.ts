import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
import * as G2 from '@antv/g2';
import { Visualization } from '../visualization';
import { VISUALIZATION } from '../visualization-component-portal';
import { get } from 'lodash';

@Component({
  selector: 'zeppelin-scatter-chart-visualization',
  templateUrl: './scatter-chart-visualization.component.html',
  styleUrls: ['./scatter-chart-visualization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScatterChartVisualizationComponent implements OnInit, AfterViewInit {
  @ViewChild('graphEle') graphEle: ElementRef<HTMLDivElement>;
  transformed;
  chart: G2.Chart;
  constructor(@Inject(VISUALIZATION) public visualization: Visualization) {}

  ngOnInit() {
    this.transformed = this.visualization.transformed;
  }

  ngAfterViewInit() {
    this.chart = new G2.Chart({
      forceFit: true,
      container: this.graphEle.nativeElement
    });
    const config = this.visualization.getConfig();
    let key = '';
    const size = get(config.setting.scatterChart.size, 'name');
    if (config.keys && config.keys[0]) {
      key = config.keys[0].name;
    }
    this.chart.source(this.transformed);
    this.chart.scale(key, {
      type: 'cat',
      tickCount: 24
    });
    this.chart.tooltip({
      crosshairs: {
        type: 'cross'
      }
    });
    this.chart.legend('__value__', false);
    // point
    const geom = this.chart
      .point()
      .position(`${key}*__value__`)
      .color('__key__')
      // .adjust('jitter')
      .opacity(0.65)
      .shape('circle');

    if (size) {
      geom.size('__value__');
    }

    this.chart.render();
  }
}
