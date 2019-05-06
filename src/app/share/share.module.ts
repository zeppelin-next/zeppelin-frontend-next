import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'zeppelin-share/header/header.component';
import { NzDropDownModule, NzIconModule, NzInputModule, NzMenuModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, NzMenuModule, NzIconModule, NzInputModule, NzDropDownModule]
})
export class ShareModule {}
