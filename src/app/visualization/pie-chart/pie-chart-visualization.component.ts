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

@Component({
  selector: 'zeppelin-pie-chart-visualization',
  templateUrl: './pie-chart-visualization.component.html',
  styleUrls: ['./pie-chart-visualization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartVisualizationComponent implements OnInit, AfterViewInit {
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
    this.chart.source(this.transformed);
    this.chart.tooltip({
      showTitle: false
    });
    this.chart.coord('theta', {
      radius: 0.75
    });
    this.chart
      .intervalStack()
      .position('__value__')
      .color('__key__')
      .style({
        lineWidth: 1,
        stroke: '#fff'
      })
      .tooltip('__key__*__value__', (name, value) => ({ name, value }));

    this.chart.render();
  }
}
