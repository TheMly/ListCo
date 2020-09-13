import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../shared/service/data.service';
import {TodoList} from '../shared/model/TodoList';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoItem} from '../shared/model/TodoItem';
import {MatDialog} from '@angular/material/dialog';
import {EditListTitleDialogComponent} from './dialog/edit-list-title-dialog.component';
import {ApiService} from '../shared/service/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';

@Component({
  selector: 'listco-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  todoList: TodoList;
  todoListSub: Subscription;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              public apiService: ApiService,
              private snackBar: MatSnackBar,
              private ref: ChangeDetectorRef) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.todoList = this.router.getCurrentNavigation().extras.state.todoListArg;
    } else {
      this.apiService.openTodoList(+activatedRoute.parent.snapshot.url[1].path);
    }
  }

  ngOnInit() {
    this.todoListSub = this.apiService.todoListSocket.subscribe(
      todoListUpdated => {
    if (todoListUpdated.id === this.todoList.id) {
      console.log('Reading from socket todo list updated');
      this.todoList = todoListUpdated;
      this.ref.detectChanges();
    }
  });
  }

  ngOnDestroy() {
    this.todoListSub.unsubscribe();
  }

  createTodoItem() {
    return this.apiService
      .createTodoItem(this.todoList.id)
      .subscribe(createdTodoItem => {
        this.todoList.todoItemsList.push(createdTodoItem);
        this.apiService.emitTodoListUpdate(this.todoList);
        console.log('Add todo - Event emitted');
      });
  }

  removeTodo(todoItemToRemove: TodoItem) {
    return this.apiService
      .removeTodoItem(todoItemToRemove.id, this.todoList.id)
      .subscribe(() => {
        this.todoList.todoItemsList = this.todoList.todoItemsList.filter(todoItem => todoItem.id !== todoItemToRemove.id);
        this.apiService.emitTodoListUpdate(this.todoList);
        console.log('Remove todo - Event emitted');
      });
  }

  openEditTitleDialog() {
    const dialogRef = this.dialog.open(EditListTitleDialogComponent, {
      width: '275px'
    });

    dialogRef.afterClosed().subscribe(newListTitle => {
      if (!newListTitle && newListTitle.length === 0) {
        return;
      }
      return this.apiService.updateTodoListTitle(this.todoList.id, newListTitle)
        .subscribe(() => {
          this.todoList.title = newListTitle;
          this.apiService.emitTodoListUpdate(this.todoList);
        });
    });
  }

    copyListUrlToClipboard() {
      document.addEventListener('copy', (e: ClipboardEvent) => {
        e.clipboardData.setData('text/plain', (document.location.href));
        e.preventDefault();
        document.removeEventListener('copy', null);
      });
      document.execCommand('copy');

      this.snackBar.open('List URL copied to clipboard!', null, { duration: 2000 });
    }
  }
