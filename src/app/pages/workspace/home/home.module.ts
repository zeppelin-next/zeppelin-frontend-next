import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NzGridModule, NzIconModule, NzToolTipModule } from 'ng-zorro-antd';
import { ShareModule } from 'zeppelin-share/share.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, NzGridModule, NzIconModule, NzToolTipModule, ShareModule]
})
export class HomeModule {}
