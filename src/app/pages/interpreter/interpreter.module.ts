import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NzBadgeModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzDividerModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzModalModule,
  NzRadioModule,
  NzSelectModule,
  NzSwitchModule,
  NzTagModule,
  NzToolTipModule
} from 'ng-zorro-antd';
import { ShareModule } from 'zeppelin-share/share.module';
import { InterpreterComponent } from './interpreter.component';
import { InterpreterRoutingModule } from './interpreter-routing.module';
import { InterpreterCreateRepositoryModalComponent } from './create-repository-modal/create-repository-modal.component';

@NgModule({
  declarations: [InterpreterComponent, InterpreterCreateRepositoryModalComponent],
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
    NzIconModule
  ]
})
export class InterpreterModule {}
