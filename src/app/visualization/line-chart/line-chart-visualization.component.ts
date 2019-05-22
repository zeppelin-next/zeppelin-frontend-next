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
  tableData;
  chart: G2.Chart;
  constructor(@Inject(VISUALIZATION) public visualization: Visualization) {}

  ngOnInit() {
    this.tableData = this.visualization.tableData;
  }

  ngAfterViewInit() {
    this.chart = new G2.Chart({
      forceFit: true,
      container: this.graphEle.nativeElement
    });
    const config = this.visualization.getConfig();
    let key = '';
    if (config.keys && config.keys[0]) {
      key = config.keys[0].name;
    }

    this.chart.source(this.tableData);

    this.chart
      .line()
      .position(`${key}*__value__`)
      .color('__key__');

    this.chart.render();
  }
}
