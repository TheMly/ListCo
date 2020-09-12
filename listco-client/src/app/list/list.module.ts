import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import {ListItemModule} from '../list-item/list-item.module';
import {EditListTitleDialogComponent} from './dialog/edit-list-title-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [ListComponent, EditListTitleDialogComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    ListItemModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ClipboardModule,
    MatSnackBarModule
  ]
})
export class ListModule { }
