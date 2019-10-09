import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzButtonModule, NzFormModule, NzIconModule, NzInputModule } from 'ng-zorro-antd';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, FormsModule, NzFormModule, NzInputModule, NzButtonModule, NzIconModule]
})
export class LoginModule {}
