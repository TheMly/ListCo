import {TodoItem} from './TodoItem';

export class TodoList {
  id: number;
  title: string;
  todoItemsList: TodoItem[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
