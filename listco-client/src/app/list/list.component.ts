import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/service/data.service';
import {TodoList} from '../shared/model/TodoList';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {TodoItem} from '../shared/model/TodoItem';

@Component({
  selector: 'listco-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  todoList: TodoList;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    const newListInd = this.route.snapshot.data.newList;
    this.getTodoList(newListInd).subscribe(todoList => this.todoList = todoList);
    console.log(this.todoList);
  }

  ngOnInit(): void { }

  getTodoList(newListInd: boolean): Observable<TodoList> {
    const listId = 3; // TODO It's hardcoded for now. When the other flux is developed
    console.log('newListInd: ' + newListInd);
    if (newListInd) {
      return this.dataService.createNewList(newListInd);
    } else {
      return this.dataService.getTodoList(newListInd, listId);
    }
  }

  createTodoItem() {
    return this.dataService
      .createTodoItem(this.todoList.id)
      .subscribe(createdTodoItem => this.todoList.todoItemsList.push(createdTodoItem));
  }

  removeTodo(todoItemToRemove: TodoItem) {
    return this.dataService
      .removeTodo(todoItemToRemove.id, this.todoList.id)
      .subscribe(obj => this.todoList.todoItemsList = this.todoList.todoItemsList.filter(todoItem => todoItem.id !== todoItemToRemove.id ));
  }

  toggleComplete(todo: TodoItem): void {
    this.dataService.toggleComplete(todo)
      .subscribe(updatedTodo => todo = updatedTodo);
  }
}
