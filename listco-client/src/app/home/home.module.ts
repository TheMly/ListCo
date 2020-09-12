import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {HomeRoutingModule} from './home-routing.module';
import {OpenListDialogComponent} from './dialog/open-list-dialog.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  declarations: [ HomeComponent, OpenListDialogComponent ]
})
export class HomeModule { }
