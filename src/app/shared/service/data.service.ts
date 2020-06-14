import { Injectable } from '@angular/core';
import {Todo} from '../model/Todo';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  createTodo(): Observable<Todo> {
    // TODO Replace for API call
    return of(
      new Todo({id: 1, complete: false})
  );
  }

  removeTodoById(todoId: number): Observable<null> {
    // TODO Replace for API call
    return of(null);
  }

  toggleComplete(todo: Todo): Observable<Todo> {
    // TODO Replace for API call
    return of(
      new Todo({id: 1, complete: true})
    );
  }
}
