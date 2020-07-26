export class TodoItem {
  id: number;
  listId: number;
  content: string;
  completed: boolean;
  position: number;

constructor(values: Object = {}) {
  Object.assign(this, values);
}
}
