import * as G2 from '@antv/g2';
import { GraphConfig } from 'zeppelin-sdk';
import { PivotTransformation } from '../pivot-transformation';
import { Setting, Transformation } from '../transformation';
import { Visualization } from '../visualization';

export class BarChartVisualization extends Visualization {
  pivot = new PivotTransformation(this.getConfig());
  chart = new G2.Chart({
    forceFit: true,
    container: this.element
  });

  constructor(config: GraphConfig, private element: HTMLDivElement) {
    super(config);
  }

  destroy(): void {}

  getSetting(): Setting {
    return undefined;
  }

  getTransformation(): Transformation {
    return this.pivot;
  }

  refresh(): void {}

  render(data): void {
    const config = this.getConfig();
    let key = '';
    if (config.keys && config.keys[0]) {
      key = config.keys[0].name;
    }

    this.chart.source(data);
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
