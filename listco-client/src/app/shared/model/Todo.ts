export class Todo {
  id: number;
  completed: boolean;

constructor(values: Object = {}) {
  Object.assign(this, values);
}
}
