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
  NzModalModule,
  NzTreeModule
} from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { AboutZeppelinComponent } from './about-zeppelin/about-zeppelin.component';
import { NodeListComponent } from './node-list/node-list.component';

const MODAL_LIST = [AboutZeppelinComponent];
const EXPORT_LIST = [HeaderComponent, NodeListComponent];

@NgModule({
  declarations: [...MODAL_LIST, ...EXPORT_LIST],
  entryComponents: [...MODAL_LIST],
  exports: [...EXPORT_LIST],
  imports: [
    CommonModule,
    NzMenuModule,
    NzIconModule,
    NzInputModule,
    NzDropDownModule,
    NzBadgeModule,
    NzGridModule,
    NzModalModule,
    NzTreeModule,
    RouterModule
  ]
})
export class ShareModule {}
