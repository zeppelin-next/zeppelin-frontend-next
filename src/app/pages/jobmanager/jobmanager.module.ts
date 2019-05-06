import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobmanagerComponent } from './jobmanager.component';
import { JobmanagerRoutingModule } from './jobmanager-routing.module';

@NgModule({
  declarations: [JobmanagerComponent],
  imports: [CommonModule, JobmanagerRoutingModule]
})
export class JobmanagerModule {}
