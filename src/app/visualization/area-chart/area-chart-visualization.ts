import * as G2 from '@antv/g2';
import { GraphConfig } from 'zeppelin-sdk';
import { PivotTransformation } from '../pivot-transformation';
import { Setting, Transformation } from '../transformation';
import { Visualization } from '../visualization';

export class AreaChartVisualization extends Visualization {
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
    const style = config.setting.stackedAreaChart.style;
    let key = '';
    if (config.keys && config.keys[0]) {
      key = config.keys[0].name;
    }

    this.chart.source(data);
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
