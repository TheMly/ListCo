import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {OpenListDialogComponent} from './open-list-dialog.component';
import {ApiService} from '../shared/service/api.service';
import {TodoList} from '../shared/model/TodoList';
import * as Fingerprint2 from 'fingerprintjs2';

@Component({
  selector: 'listco-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentLists: TodoList[];
  userFp: string;

  constructor(public dialog: MatDialog, private apiService: ApiService, private ref: ChangeDetectorRef) {

  }

  ngOnInit(): void {
      Fingerprint2.get(((components) => {
        const values = components.map(() => (component) => component.value);
        const userFp = Fingerprint2.x64hash128(values.join(''), 31);
        console.log(userFp);
        this.userFp = userFp;
        this.apiService.loadRecentLists(userFp)
          .subscribe(result => { this.recentLists = result;
                                 console.log(this.recentLists);
                                 this.ref.detectChanges();
          });
      }));

  }

  goToNewList(): void {
    console.log(this.userFp);
    this.apiService.createTodoList(this.userFp);
    }

  openTodoListDialog(): void {
      const dialogRef = this.dialog.open(OpenListDialogComponent, {
        width: '250px'
      });

      dialogRef.afterClosed().subscribe(listIdToOpen => {
        console.log('The dialog was closed');
        this.openTodoList(listIdToOpen);
      });
    }

  openTodoList(listIdToOpen): void {
      this.apiService.openTodoList(listIdToOpen);
    }
  }
