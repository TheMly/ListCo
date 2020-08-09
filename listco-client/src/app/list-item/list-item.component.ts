import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoItem} from '../shared/model/TodoItem';

@Component({
  selector: 'listco-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() todoItem: TodoItem;

  @Output() remove: EventEmitter<TodoItem> = new EventEmitter();

  @Output() toggleComplete: EventEmitter<TodoItem> = new EventEmitter();

  toggleCompletedImgSrc = '';

  constructor() {
  }

  ngOnInit(): void {
    this.loadTodoCompletedToggleImg(this.todoItem);
  }

  removeTodo(todo: TodoItem) {
    this.remove.emit(todo);
  }

  toggleCompletedTodo(todo: TodoItem) {
    todo.completed = !todo.completed;
    this.loadTodoCompletedToggleImg(todo);
    this.toggleComplete.emit(todo);
  }

  loadTodoCompletedToggleImg(todo: TodoItem): void {
    if (todo.completed) {
      this.toggleCompletedImgSrc = '/assets/icons/checked.svg';
    } else {
      this.toggleCompletedImgSrc = '/assets/icons/unchecked.svg';
    }
  }

  saveTodoItemContent(): void {
    console.log("Unfocused input field of todo item " + this.todoItem.position);
}
}
