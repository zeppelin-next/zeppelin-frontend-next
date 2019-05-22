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
  selector: 'zeppelin-bar-chart-visualization',
  templateUrl: './bar-chart-visualization.component.html',
  styleUrls: ['./bar-chart-visualization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartVisualizationComponent implements OnInit, AfterViewInit {
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
    this.chart.scale(key, {
      type: 'cat'
    });

    if (config.setting.multiBarChart.stacked) {
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

    this.chart.render();
  }
}
