import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/service/data.service';
import {TodoList} from '../shared/model/TodoList';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TodoItem} from '../shared/model/TodoItem';

@Component({
  selector: 'listco-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  todoList: TodoList;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
    this.todoList = this.router.getCurrentNavigation().extras.state.todoListArg;
  }

  ngOnInit(): void {}

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
}
