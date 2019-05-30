import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  ChangeDetectorRef
} from '@angular/core';
import { VisualizationScatterSettingComponent } from '../common/scatter-setting/scatter-setting.component';
import { G2VisualizationComponentBase } from '../g2-visualization-component-base';
import { Visualization } from '../visualization';
import { VISUALIZATION } from '../visualization-component-portal';
import { get } from 'lodash';

@Component({
  selector: 'zeppelin-scatter-chart-visualization',
  templateUrl: './scatter-chart-visualization.component.html',
  styleUrls: ['./scatter-chart-visualization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScatterChartVisualizationComponent extends G2VisualizationComponentBase implements OnInit, AfterViewInit {
  @ViewChild('container') container: ElementRef<HTMLDivElement>;
  @ViewChild(VisualizationScatterSettingComponent) scatterSettingComponent: VisualizationScatterSettingComponent;

  constructor(@Inject(VISUALIZATION) public visualization: Visualization, private cdr: ChangeDetectorRef) {
    super(visualization);
  }

  refreshSetting() {
    this.scatterSettingComponent.init();
    this.cdr.markForCheck();
  }

  renderBefore() {
    const key = this.getKey();
    const size = get(this.config.setting, 'scatterChart.size.name');
    this.chart.scale(key, {
      type: 'cat'
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
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.render();
  }
}
