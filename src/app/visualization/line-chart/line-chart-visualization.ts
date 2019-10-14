import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ViewContainerRef } from '@angular/core';

import { GraphConfig } from '@zeppelin/sdk';
import { VisualizationComponentPortal } from 'zeppelin-visualization';

import { G2VisualizationBase } from '../g2-visualization-base';
import { LineChartVisualizationComponent } from './line-chart-visualization.component';

export class LineChartVisualization extends G2VisualizationBase {
  componentPortal = new VisualizationComponentPortal<LineChartVisualization, LineChartVisualizationComponent>(
    this,
    LineChartVisualizationComponent,
    this.portalOutlet,
    this.viewContainerRef
  );

  constructor(config: GraphConfig, private portalOutlet: CdkPortalOutlet, private viewContainerRef: ViewContainerRef) {
    super(config);
  }
}
