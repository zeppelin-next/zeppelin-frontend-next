import * as G2 from '@antv/g2';
import { GraphConfig } from 'zeppelin-sdk';
import { PivotTransformation } from '../pivot-transformation';
import { Setting, Transformation } from '../transformation';
import { Visualization } from '../visualization';

export class PieChartVisualization extends Visualization {
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
    this.chart.source(data);
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
