import * as G2 from '@antv/g2';
import { GraphConfig } from 'zeppelin-sdk';
import { PivotTransformation } from '../pivot-transformation';
import { Setting, Transformation } from '../transformation';
import { Visualization } from '../visualization';

export class LineChartVisualization extends Visualization {
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
    // this.chart.scale(key, {
    //   type: 'cat'
    // });
    this.chart
      .line()
      .position(`${key}*__value__`)
      .color('__key__');
    // this.chart.intervalStack().position(`${key}*__value__`).color('__key__').opacity(1);

    // this.chart.interval()
    // .position(`${key}*__value__`)
    // .color('__key__')
    // .opacity(1)
    // .adjust([{
    //   type: 'dodge',
    //   marginRatio: 0
    // }])

    // area:stack
    // this.chart.areaStack().position(`${key}*__value__`).color('__key__').opacity(0.7);

    // area:stream
    // this.chart.area().position(`${key}*__value__`)
    // .adjust(['stack', 'symmetric'])
    // .color('__key__')
    // .opacity(0.7);

    // area:percent
    // this.chart.areaStack().position(`${key}*__percent__`).color('__key__').opacity(0.7);

    // pie
    // this.chart.coord('theta', {
    //   radius: 0.75
    // });
    // this.chart.intervalStack().position('__key__*__percent__')
    // .color(key)
    // .style({
    //   lineWidth: 1,
    //   stroke: '#fff'
    // })

    // point

    // this.chart.point().position(`${key}*__value__`).color('__key__');

    this.chart.render();
  }
}
