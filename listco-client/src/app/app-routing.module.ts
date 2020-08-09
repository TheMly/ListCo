import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent,
},
   { path: 'new-list', loadChildren: () => import('./list/list.module').then(m => m.ListModule), data : { newList: true}} ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
