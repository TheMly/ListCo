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

  todoItems: TodoItem[] = [new TodoItem({id: 1, completed: false}), new TodoItem({id: 2, completed: false})];

  todoList: TodoList;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getTodoList().subscribe(todoList => this.todoList = todoList);
    console.log(this.todoList);
  }

  getTodoList(): Observable<TodoList> {
    const newListInd = this.route.snapshot.data.newList;
    const listId = 3; // TODO It's hardcoded for now. When the other flux is developed
    // this will be replaced by the list id that comes fromthe routing.
    return this.dataService.getTodoList(newListInd, listId);
  }

  createTodo(): void {
    this.dataService.createTodo()
      .subscribe(createdTodo => {
                      this.todoItems.push(createdTodo);
                      console.log(createdTodo);
      });
  }

  removeTodo(todoToRemove: TodoItem): void {
    this.dataService.removeTodoById(todoToRemove.id).subscribe(
      (_) => {
        this.todoItems = this.todoItems.filter((todo) => todo.id !== todoToRemove.id);
      }
    );
  }

  toggleComplete(todo: TodoItem): void {
    this.dataService.toggleComplete(todo)
      .subscribe(updatedTodo => todo = updatedTodo);
  }
}
