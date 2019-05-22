import { ViewContainerRef } from '@angular/core';
import { GraphConfig } from 'zeppelin-sdk';
import { PivotTransformation } from '../pivot-transformation';
import { Setting, Transformation } from '../transformation';
import { Visualization } from '../visualization';
import { VisualizationComponentPortal } from '../visualization-component-portal';
import { AreaChartVisualizationComponent } from './area-chart-visualization.component';
import { CdkPortalOutlet } from '@angular/cdk/portal';

export class AreaChartVisualization extends Visualization {
  pivot = new PivotTransformation(this.getConfig());
  componentPortal = new VisualizationComponentPortal<AreaChartVisualization, AreaChartVisualizationComponent>(
    this,
    AreaChartVisualizationComponent,
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
