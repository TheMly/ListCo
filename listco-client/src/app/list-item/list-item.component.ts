import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoItem} from '../shared/model/TodoItem';
import {DataService} from '../shared/service/data.service';
import {ApiService} from '../shared/service/api.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'listco-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() todoItem: TodoItem;

  @Output() remove: EventEmitter<TodoItem> = new EventEmitter();

  toggleCompletedImgSrc = '';
  todoItemSub: Subscription;

  constructor(private dataService: DataService,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.loadTodoCompletedToggleImg(this.todoItem);
    this.todoItemSub = this.apiService.todoItemSocket.subscribe(
      todoItemUpdated => {
        if (todoItemUpdated.id === this.todoItem.id) {
          console.log('Reading from socket todo item updated');
          this.todoItem = todoItemUpdated;
          this.loadTodoCompletedToggleImg(this.todoItem);
          // this.ref.detectChanges();
        }
      });
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
    this.apiService.updateTodoItemText(todoItem).subscribe(updatedTodoItem => {
      this.todoItem = updatedTodoItem;
      this.apiService.emitTodoItemUpdate(this.todoItem);
    });
}

  updateTodoItemCompletedStatus(todoItem: TodoItem): void {
    console.log('Updating todo item complete status. Todo item: ' + this.todoItem.position);
    this.todoItem.completed = !todoItem.completed;
    this.loadTodoCompletedToggleImg(todoItem);
    this.apiService.updateTodoItemCompletedStatus(todoItem)
      .subscribe(() => this.apiService.emitTodoItemUpdate(this.todoItem));
  }
}
