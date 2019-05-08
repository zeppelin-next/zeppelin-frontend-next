import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NZ_ICONS,
  NzBadgeModule,
  NzCardModule,
  NzDividerModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzModalModule,
  NzProgressModule,
  NzSelectModule,
  NzToolTipModule
} from 'ng-zorro-antd';
import { JobManagerComponent } from './job-manager.component';
import { JobManagerRoutingModule } from './job-manager-routing.module';
import { JobManagerJobComponent } from './job/job.component';

import { SearchOutline, FileOutline, FileUnknownOutline, ClockCircleOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { JobManagerJobStatusComponent } from './job-status/job-status.component';

const icons: IconDefinition[] = [SearchOutline, FileOutline, FileUnknownOutline, ClockCircleOutline];

@NgModule({
  declarations: [JobManagerComponent, JobManagerJobComponent, JobManagerJobStatusComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzInputModule,
    NzBadgeModule,
    NzGridModule,
    NzModalModule,
    RouterModule,
    NzSelectModule,
    NzInputModule,
    NzFormModule,
    JobManagerRoutingModule,
    NzDividerModule,
    NzCardModule,
    NzToolTipModule,
    NzProgressModule
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class JobManagerModule {}
