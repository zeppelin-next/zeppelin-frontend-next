import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd';
import { TableVisualizationComponent } from './table/table-visualization.component';

@NgModule({
  declarations: [TableVisualizationComponent],
  entryComponents: [TableVisualizationComponent],
  exports: [TableVisualizationComponent],
  imports: [CommonModule, NzTableModule]
})
export class VisualizationModule {}
