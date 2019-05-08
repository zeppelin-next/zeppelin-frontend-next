import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'zeppelin-share/header/header.component';
import {
  NzBadgeModule,
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
  NzFormModule
} from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { AboutZeppelinComponent } from './about-zeppelin/about-zeppelin.component';
import { NodeListComponent } from './node-list/node-list.component';
import { FormsModule } from '@angular/forms';
import { NoteImportComponent } from './note-import/note-import.component';
import { HumanizeBytesPipe } from 'zeppelin-share/pipes/humanize-bytes.pipe';

const MODAL_LIST = [AboutZeppelinComponent, NoteImportComponent];
const EXPORT_LIST = [HeaderComponent, NodeListComponent];
const PIPES = [HumanizeBytesPipe];

@NgModule({
  declarations: [...MODAL_LIST, ...EXPORT_LIST, ...PIPES],
  entryComponents: [...MODAL_LIST],
  exports: [...EXPORT_LIST, ...PIPES],
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
    NzNotificationModule,
    NzToolTipModule,
    NzPopconfirmModule,
    NzPopconfirmModule,
    NzFormModule
  ]
})
export class ShareModule {}
