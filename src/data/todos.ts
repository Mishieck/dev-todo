import type { Todo } from "./todo";

export class Todos {
  #todos: Array<Todo>;

  constructor(todos: Array<Todo>) {
    this.#todos = todos;
  }

  add(todo: Todo) {
    this.#todos.push(todo);
  }

  read(): IterableIterator<Todo> {
    const todos = this.#todos;
    return (function* () { for (const todo of todos) yield todo; })();
  }

  del(todoId: string) {
    const indexOfTodo = this.#todos.findIndex(todo => todo.id === todoId);
    if (indexOfTodo === -1) return;
    this.#todos.splice(indexOfTodo, 1);
  }
}
