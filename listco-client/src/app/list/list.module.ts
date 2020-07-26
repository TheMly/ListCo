import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import {ListItemModule} from '../list-item/list-item.module';


@NgModule({
  declarations: [ListComponent],
    imports: [
        CommonModule,
        ListRoutingModule,
        ListItemModule
    ]
})
export class ListModule { }
