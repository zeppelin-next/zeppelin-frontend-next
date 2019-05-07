import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NzGridModule, NzIconModule, NzToolTipModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, NzGridModule, NzIconModule, NzToolTipModule]
})
export class HomeModule {}
