import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotebookComponent } from './notebook.component';
import { NotebookRoutingModule } from './notebook-routing.module';
import { NotebookActionBarComponent } from './action-bar/action-bar.component';
import { ShareModule } from 'zeppelin-share/share.module';
import { NotebookShareModule } from './share/share.module';
import {
  NzButtonModule,
  NzDropDownModule,
  NzIconModule,
  NzNoAnimationModule,
  NzPopconfirmModule,
  NzToolTipModule
} from 'ng-zorro-antd';

@NgModule({
  declarations: [NotebookComponent, NotebookActionBarComponent],
  imports: [
    CommonModule,
    NotebookRoutingModule,
    ShareModule,
    NotebookShareModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzNoAnimationModule,
    NzToolTipModule,
    NzPopconfirmModule
  ]
})
export class NotebookModule {}
