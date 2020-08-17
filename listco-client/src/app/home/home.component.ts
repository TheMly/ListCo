import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {OpenListDialogComponent} from './open-list-dialog.component';
import {ApiService} from '../shared/service/api.service';

@Component({
  selector: 'listco-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listIdToOpen: number;

  constructor(private router: Router, public dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  goToNewList(): void {
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
