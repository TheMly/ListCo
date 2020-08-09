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

  rootURL = '/api';

  createNewList(newList: boolean): Observable<TodoList> {
    let url: string;
    console.log(newList);
    url = this.rootURL + '/createTodoList';
    return this.http.get<TodoList>(url).pipe(map(todoList => todoList));
    }

  getTodoList(newList: boolean, listId: number): Observable<TodoList> {
    let url: string;
    console.log(newList);
    url = `${this.rootURL + '/getTodoList'}/${listId}`;
    return this.http.get<TodoList>(url).pipe(map(todoList => todoList));
  }

  createTodoItem(listId: number): Observable<TodoItem> {
    let url: string;
    url = `${this.rootURL + '/createTodoItem'}/${listId}`;
    return this.http.get<TodoItem>(url).pipe(map(data => data));
  }

  removeTodoById(todoId: number): Observable<null> {
    // TODO Replace for API call
    return of(null);
  }

  toggleComplete(todo: TodoItem): Observable<TodoItem> {
    // TODO Replace for API call
    return of(
      new TodoItem()
    );
  }

  updateItemText(todo: TodoItem): Observable<TodoItem> {
    // TODO Replace for API call
    return of(
      new TodoItem()
    );
  }
}
