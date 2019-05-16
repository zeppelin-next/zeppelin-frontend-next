import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotebookComponent } from './notebook.component';
import { NotebookRoutingModule } from './notebook-routing.module';
import { NotebookActionBarComponent } from './action-bar/action-bar.component';
import { ShareModule } from 'zeppelin-share/share.module';
import { NotebookShareModule } from './share/share.module';
import {
  NzButtonModule,
  NzCheckboxModule,
  NzDividerModule,
  NzDropDownModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzNoAnimationModule,
  NzPopconfirmModule,
  NzPopoverModule,
  NzToolTipModule
} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { NotebookInterpreterBindingComponent } from './interpreter-binding/interpreter-binding.component';

@NgModule({
  declarations: [NotebookComponent, NotebookActionBarComponent, NotebookInterpreterBindingComponent],
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
    NzPopconfirmModule,
    NzFormModule,
    NzPopoverModule,
    NzInputModule,
    FormsModule,
    NzDividerModule,
    NzCheckboxModule
  ]
})
export class NotebookModule {}
