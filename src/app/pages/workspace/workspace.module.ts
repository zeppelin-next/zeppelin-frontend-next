import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ShareModule } from '@zeppelin/share';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';

@NgModule({
  declarations: [WorkspaceComponent],
  imports: [CommonModule, WorkspaceRoutingModule, FormsModule, HttpClientModule, ShareModule, RouterModule]
})
export class WorkspaceModule {}
