import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../shared/model/Todo';

@Component({
  selector: 'listco-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() todo: Todo;

  @Output() remove: EventEmitter<Todo> = new EventEmitter();

  @Output() toggleComplete: EventEmitter<Todo> = new EventEmitter();

  toggleCompletedImgSrc = '';

  constructor() {
  }

  ngOnInit(): void {
    this.loadTodoCompletedToggleImg(this.todo);
  }

  removeTodo(todo: Todo) {
    this.remove.emit(todo);
  }

  toggleCompletedTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.loadTodoCompletedToggleImg(todo);
    this.toggleComplete.emit(todo);
  }

  loadTodoCompletedToggleImg(todo: Todo): void {
    if (todo.completed) {
      this.toggleCompletedImgSrc = '/assets/icons/checked.svg';
    } else {
      this.toggleCompletedImgSrc = '/assets/icons/unchecked.svg';
    }
  }
}
