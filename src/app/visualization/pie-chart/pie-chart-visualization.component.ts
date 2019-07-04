import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
import { VisualizationPivotSettingComponent } from '../common/pivot-setting/pivot-setting.component';
import { G2VisualizationComponentBase } from '../g2-visualization-component-base';
import { Visualization } from '../visualization';
import { VISUALIZATION } from '../visualization-component-portal';

@Component({
  selector: 'zeppelin-pie-chart-visualization',
  templateUrl: './pie-chart-visualization.component.html',
  styleUrls: ['./pie-chart-visualization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartVisualizationComponent extends G2VisualizationComponentBase implements OnInit, AfterViewInit {
  @ViewChild('container', { static: false }) container: ElementRef<HTMLDivElement>;
  @ViewChild(VisualizationPivotSettingComponent, { static: false })
  pivotSettingComponent: VisualizationPivotSettingComponent;

  constructor(@Inject(VISUALIZATION) public visualization: Visualization) {
    super(visualization);
  }

  ngOnInit() {}

  refreshSetting() {
    this.pivotSettingComponent.init();
  }

  setScale() {
    // Noop
  }

  renderBefore() {
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
  }

  ngAfterViewInit() {
    this.render();
  }
}
