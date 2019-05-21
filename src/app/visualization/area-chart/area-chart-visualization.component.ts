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
  selector: 'zeppelin-area-chart-visualization',
  templateUrl: './area-chart-visualization.component.html',
  styleUrls: ['./area-chart-visualization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaChartVisualizationComponent implements OnInit, AfterViewInit {
  @ViewChild('graphEle') graphEle: ElementRef<HTMLDivElement>;
  tableData;
  chart: G2.Chart;
  constructor(@Inject(VISUALIZATION) public visualization: Visualization) {}

  ngOnInit() {
    this.tableData = this.visualization.tableData;
  }

  ngAfterViewInit(): void {
    this.chart = new G2.Chart({
      forceFit: true,
      container: this.graphEle.nativeElement
    });

    const config = this.visualization.getConfig();
    const style = config.setting.stackedAreaChart.style;
    let key = '';
    if (config.keys && config.keys[0]) {
      key = config.keys[0].name;
    }

    this.chart.source(this.tableData);
    this.chart.scale(key, {
      type: 'cat'
    });

    if (style === 'stack') {
      // area:stack
      this.chart
        .areaStack()
        .position(`${key}*__value__`)
        .color('__key__');
    } else if (style === 'stream') {
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

    this.chart.render();
  }
}
