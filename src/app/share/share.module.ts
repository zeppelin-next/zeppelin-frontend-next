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
  NzTreeModule
} from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { AboutZeppelinComponent } from './about-zeppelin/about-zeppelin.component';
import { NodeListComponent } from './node-list/node-list.component';
import { FormsModule } from '@angular/forms';

const MODAL_LIST = [AboutZeppelinComponent];
const EXPORT_LIST = [HeaderComponent, NodeListComponent];

@NgModule({
  declarations: [...MODAL_LIST, ...EXPORT_LIST],
  entryComponents: [...MODAL_LIST],
  exports: [...EXPORT_LIST],
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
    NzToolTipModule
  ]
})
export class ShareModule {}
