import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';
import {OpenListDialogComponent} from '../../../home/open-list-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import * as Fingerprint2 from 'fingerprintjs2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  listIdToOpen: number;
  userFp: string;


  constructor(public dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void {
    Fingerprint2.get(((components) => {
      const values = components.map(() => (component) => component.value);
      const userFp = Fingerprint2.x64hash128(values.join(''), 31);
      this.userFp = userFp;
    }));
  }

  openNewList(): void {
    this.apiService.createTodoList(this.userFp);
  }

  openTodoListDialog(): void {
    const dialogRef = this.dialog.open(OpenListDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listIdToOpen = result;
      this.openTodoList();
    });
  }

  openTodoList(): void {
    this.apiService.openTodoList(this.listIdToOpen);
  }

}
