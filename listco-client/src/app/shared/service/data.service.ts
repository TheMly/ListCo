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

  createNewList(userFp: string): Observable<TodoList> {

    this.url = `${this.rootUrl + '/createTodoList'}/${userFp}`;
    return this.http.put<TodoList>(this.url, null).pipe(map(todoList => todoList));
    }

  getTodoList(todoListId: number): Observable<TodoList> {
    this.url = `${this.rootUrl + '/getTodoList'}/${todoListId}`;
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

  loadRecentLists(userFp: string): Observable<TodoList[]> {
    this.url = `${this.rootUrl + '/loadRecentLists'}/${userFp}`;
    return this.http.get<TodoList[]>(this.url);
  }

  removeRecentList(recentListId: number, userFp: string): Observable<any> {
    this.url = `${this.rootUrl + '/removeRecentList'}/${recentListId}/${userFp}`;
    return this.http.post(this.url, null);
  }

  updateTodoListTitle(todoListId, newListTitle): Observable<any> {
    this.url = `${this.rootUrl + '/updateTodoListTitle'}/${todoListId}`;
    return this.http.post(this.url, newListTitle);
  }
}
