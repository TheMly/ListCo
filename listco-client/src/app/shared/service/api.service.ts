import {Injectable, NgZone} from '@angular/core';
import {DataService} from './data.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TodoList} from '../model/TodoList';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private dataService: DataService, private router: Router, public ngZone: NgZone) {}

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

   loadRecentLists(userFp: string): Observable<TodoList[]> {
    return this.dataService.loadRecentLists(userFp);
  }

   removeRecentList(recentListId: number, userFp: string): Observable<any> {
     return this.dataService.removeRecentList(recentListId, userFp);
   }
}
