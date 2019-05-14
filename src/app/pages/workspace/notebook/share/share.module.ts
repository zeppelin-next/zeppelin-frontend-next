import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElasticInputComponent } from './elastic-input/elastic-input.component';
import { NzInputModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ElasticInputComponent],
  exports: [ElasticInputComponent],
  imports: [CommonModule, NzInputModule, FormsModule]
})
export class NotebookShareModule {}
