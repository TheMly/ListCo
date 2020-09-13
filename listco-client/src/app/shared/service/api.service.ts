import {Injectable, NgZone} from '@angular/core';
import {DataService} from './data.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TodoList} from '../model/TodoList';
import {Socket} from 'ngx-socket-io';
import {TodoItem} from '../model/TodoItem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  todoListSocket = this.socket.fromEvent<TodoList>('UPDATED_LIST');
  todoItemSocket = this.socket.fromEvent<TodoItem>('UPDATED_ITEM');

  constructor(private dataService: DataService,
              private router: Router,
              public ngZone: NgZone,
              private socket: Socket) {}

    createTodoList(userFp: string) {
      console.log(userFp);
      this.dataService.createNewList(userFp)
        .subscribe(
          createdTodoList => {
            this.ngZone.run(() => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/todo-list', createdTodoList.id], {
                state: {todoListArg: createdTodoList}
              }));
          });
  });
    }

  openTodoList(listId: number) {
    console.log(listId);
    this.dataService.getTodoList(listId)
      .subscribe(
      openedTodoList => {
        console.log(openedTodoList);
        this.ngZone.run(() => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
         this.router.navigate(['/todo-list', openedTodoList.id], {
              state: { todoListArg: openedTodoList }}));
        });
  });
}

  createTodoItem(todoListId: number) {
    return this.dataService.createTodoItem(todoListId);
  }

  removeTodoItem(todoItemId: number, todoListId: number) {
    return this.dataService.removeTodoItem(todoItemId, todoListId);
  }

   loadRecentLists(userFp: string): Observable<TodoList[]> {
    return this.dataService.loadRecentLists(userFp);
  }

   removeRecentList(recentListId: number, userFp: string): Observable<any> {
     return this.dataService.removeRecentList(recentListId, userFp);
   }

   updateTodoListTitle(todoListId: number, newListTitle: string) {
    return this.dataService.updateTodoListTitle(todoListId, newListTitle);
   }

   updateTodoItemText(todoItem: TodoItem) {
     return this.dataService.updateTodoItemText(todoItem);
   }

  updateTodoItemCompletedStatus(todoItem: TodoItem) {
    return this.dataService.updateTodoItemCompletedStatus(todoItem);
  }

   emitTodoListUpdate(updatedTodoList: TodoList) {
     this.socket.emit('UPDATE_LIST', updatedTodoList);
   }

   emitTodoItemUpdate(updatedTodoItem: TodoItem) {
     this.socket.emit('UPDATE_ITEM', updatedTodoItem);
   }
}
