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
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'notebook',
        loadChildren: './notebook/notebook.module#NotebookModule'
      },
      {
        path: 'jobmanager',
        loadChildren: './job-manager/job-manager.module#JobManagerModule'
      },
      {
        path: 'interpreter',
        loadChildren: './interpreter/interpreter.module#InterpreterModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule {}
