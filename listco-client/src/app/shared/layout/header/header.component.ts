import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';
import {OpenListDialogComponent} from '../../../home/open-list-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  listIdToOpen: number;

  constructor(public dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  openNewList(): void {
    this.apiService.createTodoList();
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
