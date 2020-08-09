import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {TodoList} from '../model/TodoList';
import {TodoItem} from '../model/TodoItem';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  rootUrl = '/api';

  url: string;

  createNewList(newList: boolean): Observable<TodoList> {
    console.log(newList);
    this.url = this.rootUrl + '/createTodoList';
    return this.http.put<TodoList>(this.url, null).pipe(map(todoList => todoList));
    }

  getTodoList(newList: boolean, listId: number): Observable<TodoList> {
    console.log(newList);
    this.url = `${this.rootUrl + '/getTodoList'}/${listId}`;
    return this.http.get<TodoList>(this.url).pipe(map(todoList => todoList));
  }

  createTodoItem(todoListId: number): Observable<TodoItem> {
    this.url = `${this.rootUrl + '/createTodoItem'}/${todoListId}`;
    return this.http.put<TodoItem>(this.url, null).pipe(map(todoItem => todoItem));
  }

  removeTodo(todoItemToRemoveId: number, todoListId: number): Observable<any> {
    this.url = `${this.rootUrl + '/removeTodoItem'}/${todoItemToRemoveId}/${todoListId}`;
    return this.http.post(this.url, null);
  }

  updateTodoItemText(todoItem: TodoItem): Observable<TodoItem> {
    this.url = `${this.rootUrl + '/updateTodoItemText'}`;
    return this.http.post<TodoItem>(this.url, todoItem);
  }

  updateTodoItemCompletedStatus(todoItem: TodoItem): Observable<TodoItem> {
    this.url = `${this.rootUrl + '/updateTodoItemCompletedStatus'}`;
    return this.http.post<TodoItem>(this.url, todoItem);
  }
}
