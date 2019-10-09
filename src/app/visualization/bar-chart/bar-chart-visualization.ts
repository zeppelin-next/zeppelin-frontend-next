import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ViewContainerRef } from '@angular/core';
import { GraphConfig } from '@zeppelin/sdk';

import { G2VisualizationBase } from '../g2-visualization-base';
import { VisualizationComponentPortal } from '../visualization-component-portal';
import { BarChartVisualizationComponent } from './bar-chart-visualization.component';

export class BarChartVisualization extends G2VisualizationBase {
  componentPortal = new VisualizationComponentPortal<BarChartVisualization, BarChartVisualizationComponent>(
    this,
    BarChartVisualizationComponent,
    this.portalOutlet,
    this.viewContainerRef
  );
  constructor(config: GraphConfig, private portalOutlet: CdkPortalOutlet, private viewContainerRef: ViewContainerRef) {
    super(config);
  }
}
