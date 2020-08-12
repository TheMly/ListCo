import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'todo-list/:id', loadChildren: () => import('./list/list.module').then(m => m.ListModule)}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
