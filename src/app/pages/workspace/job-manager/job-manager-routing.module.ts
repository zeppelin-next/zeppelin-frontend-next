import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobManagerComponent } from './job-manager.component';

const routes: Routes = [
  {
    path: '',
    component: JobManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobManagerRoutingModule {}
