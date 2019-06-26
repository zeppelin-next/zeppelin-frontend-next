import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceGuard } from './workspace.guard';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    canActivate: [WorkspaceGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'notebook',
        loadChildren: () => import('./notebook/notebook.module').then(m => m.NotebookModule)
      },
      {
        path: 'jobmanager',
        loadChildren: () => import('./job-manager/job-manager.module').then(m => m.JobManagerModule)
      },
      {
        path: 'interpreter',
        loadChildren: () => import('./interpreter/interpreter.module').then(m => m.InterpreterModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule {}
