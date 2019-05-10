import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShareModule } from 'zeppelin-share/share.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WorkspaceComponent],
  imports: [CommonModule, WorkspaceRoutingModule, FormsModule, HttpClientModule, ShareModule, RouterModule]
})
export class WorkspaceModule {}
