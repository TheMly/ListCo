import {TodoItem} from './TodoItem';

export class TodoList {
  id: number;
  title: string;
  todoItemsList: TodoItem[];
  creationDate: Date

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
