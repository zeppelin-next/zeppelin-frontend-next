import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ShareModule } from '@zeppelin/share';

import { WorkspaceComponent } from './workspace.component';
import { WorkspaceRoutingModule } from './workspace-routing.module';

@NgModule({
  declarations: [WorkspaceComponent],
  imports: [CommonModule, WorkspaceRoutingModule, FormsModule, HttpClientModule, ShareModule, RouterModule]
})
export class WorkspaceModule {}
