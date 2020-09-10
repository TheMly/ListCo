import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TodoList} from '../model/TodoList';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  userFp: string;

  constructor(private dataService: DataService, private router: Router) {}

    createTodoList(userFp: string) {
      console.log(userFp);
      this.dataService.createNewList(userFp)
        .subscribe(
          createdTodoList => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/todo-list', createdTodoList.id], {
                state: {todoListArg: createdTodoList}
              }));
          });
  }

  openTodoList(listId: number): void {
    this.dataService.getTodoList(listId)
      .subscribe(
      openedTodoList => { this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                                this.router.navigate(['/todo-list', openedTodoList.id], {
                                state: { todoListArg: openedTodoList}}));
      });
  }

   loadRecentLists(userFp: string): Observable<TodoList[]> {
    return this.dataService.loadRecentLists(userFp);
  }
}
