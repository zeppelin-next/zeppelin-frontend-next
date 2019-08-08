import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'zeppelin-share/header/header.component';
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
import { RouterModule } from '@angular/router';
import { RectResizeModule } from 'zeppelin-share/rect-resize/rect-resize.module';
import { AboutZeppelinComponent } from './about-zeppelin/about-zeppelin.component';
import { NodeListComponent } from './node-list/node-list.component';
import { FormsModule } from '@angular/forms';
import { NoteImportComponent } from './note-import/note-import.component';
import { HumanizeBytesPipe } from 'zeppelin-share/pipes/humanize-bytes.pipe';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteRenameComponent } from './note-rename/note-rename.component';
import { FolderRenameComponent } from './folder-rename/folder-rename.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SpinComponent } from './spin/spin.component';
import { MathJaxDirective } from './math-jax/math-jax.directive';
import { RunScriptsDirective } from './run-scripts/run-scripts.directive';

const MODAL_LIST = [
  AboutZeppelinComponent,
  NoteImportComponent,
  NoteCreateComponent,
  NoteRenameComponent,
  FolderRenameComponent
];
const EXPORT_LIST = [HeaderComponent, NodeListComponent, PageHeaderComponent, SpinComponent];
const PIPES = [HumanizeBytesPipe];

@NgModule({
  declarations: [...MODAL_LIST, ...EXPORT_LIST, ...PIPES, MathJaxDirective, RunScriptsDirective],
  entryComponents: [...MODAL_LIST],
  exports: [...EXPORT_LIST, ...PIPES, RectResizeModule, MathJaxDirective, RunScriptsDirective],
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
    NzProgressModule,
    RectResizeModule
  ]
})
export class ShareModule {}
