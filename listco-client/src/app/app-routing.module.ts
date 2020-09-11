import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'todo-list/:id', pathMatch: 'full', loadChildren: () => import('./list/list.module').then(m => m.ListModule)},
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
