import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  NzBadgeModule,
  NzCardModule,
  NzDividerModule,
  NzDropDownModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzMenuModule,
  NzNotificationModule,
  NzModalModule,
  NzToolTipModule,
  NzTreeModule,
  NzPopconfirmModule,
  NzFormModule,
  NzTabsModule,
  NzUploadModule,
  NzButtonModule,
  NzAlertModule,
  NzSelectModule,
  NzMessageModule,
  NzProgressModule
} from 'ng-zorro-antd';

import { AboutZeppelinComponent } from '@zeppelin/share/about-zeppelin/about-zeppelin.component';
import { NoteImportComponent } from '@zeppelin/share/note-import/note-import.component';
import { NoteCreateComponent } from '@zeppelin/share/note-create/note-create.component';
import { NoteRenameComponent } from '@zeppelin/share/note-rename/note-rename.component';
import { FolderRenameComponent } from '@zeppelin/share/folder-rename/folder-rename.component';
import { HeaderComponent } from '@zeppelin/share/header/header.component';
import { NodeListComponent } from '@zeppelin/share/node-list/node-list.component';
import { PageHeaderComponent } from '@zeppelin/share/page-header/page-header.component';
import { SpinComponent } from '@zeppelin/share/spin/spin.component';
import { HumanizeBytesPipe } from '@zeppelin/share/pipes';
import { RunScriptsDirective } from '@zeppelin/share/run-scripts/run-scripts.directive';
import { MathJaxDirective } from '@zeppelin/share/math-jax/math-jax.directive';
import { ResizeHandleComponent } from './resize-handle';

const MODAL_LIST = [
  AboutZeppelinComponent,
  NoteImportComponent,
  NoteCreateComponent,
  NoteRenameComponent,
  FolderRenameComponent
];
const EXPORT_LIST = [HeaderComponent, NodeListComponent, PageHeaderComponent, SpinComponent, ResizeHandleComponent];
const PIPES = [HumanizeBytesPipe];

@NgModule({
  declarations: [MODAL_LIST, EXPORT_LIST, PIPES, MathJaxDirective, RunScriptsDirective],
  entryComponents: [MODAL_LIST],
  exports: [EXPORT_LIST, PIPES, MathJaxDirective, RunScriptsDirective],
  imports: [
    FormsModule,
    CommonModule,
    NzMenuModule,
    NzIconModule,
    NzInputModule,
    NzDropDownModule,
    NzBadgeModule,
    NzGridModule,
    NzModalModule,
    NzTreeModule,
    RouterModule,
    NzButtonModule,
    NzNotificationModule,
    NzToolTipModule,
    NzDividerModule,
    NzMessageModule,
    NzCardModule,
    NzPopconfirmModule,
    NzPopconfirmModule,
    NzFormModule,
    NzTabsModule,
    NzUploadModule,
    NzSelectModule,
    NzAlertModule,
    NzProgressModule
  ]
})
export class ShareModule {}
