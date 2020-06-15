import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {Todo} from '../shared/model/Todo';
import {DataService} from '../shared/service/data.service';

@Component({
  selector: 'listco-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  todoList: Todo[] = [new Todo({id: 1, completed: false}), new Todo({id: 2, completed: false})];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  createTodo(): void {
    this.dataService.createTodo()
      .subscribe(createdTodo => this.todoList.push(createdTodo));
  }

  removeTodo(todoToRemove: Todo): void {
    this.dataService.removeTodoById(todoToRemove.id).subscribe(
      (_) => {
        this.todoList = this.todoList.filter((todo) => todo.id !== todoToRemove.id);
      }
    );
  }

  toggleComplete(todo: Todo): void {
    this.dataService.toggleComplete(todo)
      .subscribe(updatedTodo => todo = updatedTodo);
  }
}
