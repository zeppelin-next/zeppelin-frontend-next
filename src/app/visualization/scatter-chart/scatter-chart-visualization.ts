import { ViewContainerRef } from '@angular/core';
import { GraphConfig } from 'zeppelin-sdk';
import { G2VisualizationBase } from '../g2-visualization-base';
import { VisualizationComponentPortal } from '../visualization-component-portal';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ScatterChartVisualizationComponent } from './scatter-chart-visualization.component';

export class ScatterChartVisualization extends G2VisualizationBase {
  componentPortal = new VisualizationComponentPortal<ScatterChartVisualization, ScatterChartVisualizationComponent>(
    this,
    ScatterChartVisualizationComponent,
    this.portalOutlet,
    this.viewContainerRef
  );

  constructor(config: GraphConfig, private portalOutlet: CdkPortalOutlet, private viewContainerRef: ViewContainerRef) {
    super(config);
  }
}
