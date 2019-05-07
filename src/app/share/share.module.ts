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
  NzModalModule
} from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { AboutZeppelinComponent } from './about-zeppelin/about-zeppelin.component';

const MODAL_LIST = [AboutZeppelinComponent];

@NgModule({
  declarations: [HeaderComponent, ...MODAL_LIST],
  entryComponents: [...MODAL_LIST],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    NzMenuModule,
    NzIconModule,
    NzInputModule,
    NzDropDownModule,
    NzBadgeModule,
    NzGridModule,
    NzModalModule,
    RouterModule
  ]
})
export class ShareModule {}
