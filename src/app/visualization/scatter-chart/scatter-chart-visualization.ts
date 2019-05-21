import * as G2 from '@antv/g2';
import { GraphConfig } from 'zeppelin-sdk';
import { PivotTransformation } from '../pivot-transformation';
import { Setting, Transformation } from '../transformation';
import { Visualization } from '../visualization';

export class ScatterChartVisualization extends Visualization {
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
    this.chart
      .point()
      .position(`${key}*__value__`)
      .color('__key__')
      // .adjust('jitter')
      .size('__value__')
      .opacity(0.65)
      .shape('circle');

    this.chart.render();
  }
}
