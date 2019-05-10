import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotebookComponent } from './notebook.component';
import { NotebookRoutingModule } from './notebook-routing.module';

@NgModule({
  declarations: [NotebookComponent],
  imports: [CommonModule, NotebookRoutingModule]
})
export class NotebookModule {}
