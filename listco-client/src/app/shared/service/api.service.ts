import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private dataService: DataService, private router: Router) {

  }

  createTodoList(): void {
    this.dataService.createNewList()
      .subscribe(
        createdTodoList =>  this.router.navigate(['/todo-list', createdTodoList.id], {
      state: { todoListArg: createdTodoList}
    }));

  }

  openTodoList(listId: number): void {
    this.dataService.getTodoList(listId)
      .subscribe(
      openedTodoList => this.router.navigate(['/todo-list', openedTodoList.id], {
      state: { todoListArg: openedTodoList}
    }));
  }
}
