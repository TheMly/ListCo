import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoItem} from '../shared/model/TodoItem';
import {DataService} from '../shared/service/data.service';

@Component({
  selector: 'listco-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() todoItem: TodoItem;

  @Output() remove: EventEmitter<TodoItem> = new EventEmitter();

  toggleCompletedImgSrc = '';

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.loadTodoCompletedToggleImg(this.todoItem);
  }

  removeTodo(todoItem: TodoItem) {
    this.remove.emit(todoItem);
  }

  loadTodoCompletedToggleImg(todo: TodoItem): void {
    if (todo.completed) {
      this.toggleCompletedImgSrc = '/assets/icons/checked.svg';
    } else {
      this.toggleCompletedImgSrc = '/assets/icons/unchecked.svg';
    }
  }

  updateTodoItemText(todoItem: TodoItem, event): void {
    console.log('Updating todo item text. Todo item: ' + this.todoItem.position);
    todoItem.content = event.target.value;
    this.dataService.updateTodoItemText(todoItem).subscribe(updatedTodoItem => this.todoItem = updatedTodoItem);
}

  updateTodoItemCompletedStatus(todoItem: TodoItem): void {
    console.log('Updating todo item complete status. Todo item: ' + this.todoItem.position);
    todoItem.completed = !todoItem.completed;
    this.loadTodoCompletedToggleImg(todoItem);
    this.dataService.updateTodoItemCompletedStatus(todoItem).subscribe();
  }
}
