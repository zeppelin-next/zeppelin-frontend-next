import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd';
import { TableVisualizationComponent } from './table/table-visualization.component';
import { AreaChartVisualizationComponent } from './area-chart/area-chart-visualization.component';
import { BarChartVisualizationComponent } from './bar-chart/bar-chart-visualization.component';
import { LineChartVisualizationComponent } from './line-chart/line-chart-visualization.component';
import { PieChartVisualizationComponent } from './pie-chart/pie-chart-visualization.component';
import { ScatterChartVisualizationComponent } from './scatter-chart/scatter-chart-visualization.component';

const VisualizationComponents = [
  TableVisualizationComponent,
  AreaChartVisualizationComponent,
  BarChartVisualizationComponent,
  LineChartVisualizationComponent,
  PieChartVisualizationComponent,
  ScatterChartVisualizationComponent
];

@NgModule({
  declarations: [...VisualizationComponents],
  entryComponents: [...VisualizationComponents],
  exports: [...VisualizationComponents],
  imports: [CommonModule, NzTableModule]
})
export class VisualizationModule {}
