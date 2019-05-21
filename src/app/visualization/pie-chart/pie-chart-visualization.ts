import { ViewContainerRef } from '@angular/core';
import { GraphConfig } from 'zeppelin-sdk';
import { PivotTransformation } from '../pivot-transformation';
import { Setting, Transformation } from '../transformation';
import { Visualization } from '../visualization';
import { VisualizationComponentPortal } from '../visualization-component-portal';
import { PieChartVisualizationComponent } from './pie-chart-visualization.component';
import { CdkPortalOutlet } from '@angular/cdk/portal';

export class PieChartVisualization extends Visualization {
  pivot = new PivotTransformation(this.getConfig());
  componentPortal = new VisualizationComponentPortal<PieChartVisualization, PieChartVisualizationComponent>(
    this,
    PieChartVisualizationComponent,
    this.portalOutlet,
    this.viewContainerRef
  );

  constructor(config: GraphConfig, private portalOutlet: CdkPortalOutlet, private viewContainerRef: ViewContainerRef) {
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
    this.tableData = data;
    this.componentPortal.attachComponentPortal();
  }
}
