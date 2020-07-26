export class TodoList {
  id: number;
  title: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
