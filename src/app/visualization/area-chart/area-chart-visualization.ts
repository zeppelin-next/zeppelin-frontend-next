import { ViewContainerRef } from '@angular/core';
import { GraphConfig } from 'zeppelin-sdk';
import { G2VisualizationBase } from '../g2-visualization-base';
import { VisualizationComponentPortal } from '../visualization-component-portal';
import { AreaChartVisualizationComponent } from './area-chart-visualization.component';
import { CdkPortalOutlet } from '@angular/cdk/portal';

export class AreaChartVisualization extends G2VisualizationBase {
  componentPortal = new VisualizationComponentPortal<AreaChartVisualization, AreaChartVisualizationComponent>(
    this,
    AreaChartVisualizationComponent,
    this.portalOutlet,
    this.viewContainerRef
  );

  constructor(config: GraphConfig, private portalOutlet: CdkPortalOutlet, private viewContainerRef: ViewContainerRef) {
    super(config);
  }
}
