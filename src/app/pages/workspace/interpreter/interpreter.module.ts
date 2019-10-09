import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NzBadgeModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzDividerModule,
  NzDropDownModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzModalModule,
  NzRadioModule,
  NzSelectModule,
  NzSwitchModule,
  NzTagModule,
  NzToolTipModule,
  NzTableModule,
  NzMessageModule,
  NzAlertModule
} from 'ng-zorro-antd';

import { ShareModule } from '@zeppelin/share';

import { InterpreterComponent } from './interpreter.component';
import { InterpreterRoutingModule } from './interpreter-routing.module';
import { InterpreterCreateRepositoryModalComponent } from './create-repository-modal/create-repository-modal.component';
import { InterpreterItemComponent } from './item/item.component';

@NgModule({
  declarations: [InterpreterComponent, InterpreterCreateRepositoryModalComponent, InterpreterItemComponent],
  entryComponents: [InterpreterCreateRepositoryModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InterpreterRoutingModule,
    ShareModule,
    NzFormModule,
    NzSelectModule,
    NzSwitchModule,
    NzToolTipModule,
    NzCheckboxModule,
    NzRadioModule,
    NzBadgeModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzDividerModule,
    NzTagModule,
    NzCardModule,
    NzDropDownModule,
    NzIconModule,
    NzTableModule,
    NzMessageModule,
    NzAlertModule
  ]
})
export class InterpreterModule {}
