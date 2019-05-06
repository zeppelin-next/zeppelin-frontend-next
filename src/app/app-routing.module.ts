import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule'
  },
  {
    path: 'notebook',
    loadChildren: './pages/notebook/notebook.module#NotebookModule'
  },
  {
    path: 'jobmanager',
    loadChildren: './pages/jobmanager/jobmanager.module#JobmanagerModule'
  },
  {
    path: 'interpreter',
    loadChildren: './pages/interpreter/interpreter.module#InterpreterModule'
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
