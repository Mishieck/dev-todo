import type { Todo } from "../data/todo";
import type { Event, Observable, Observer } from "./observable";

export type TodosEventName = 'add' | 'update' | 'delete';
export type TodosEvent<Name extends TodosEventName> = Event<Name, Todo>;

export type AddEvent = TodosEvent<'add'>;
export type UpdateEvent = TodosEvent<'update'>;
export type DeleteEvent = TodosEvent<'delete'>;

export type AddEventObserver = Observer<AddEvent>;
export type UpdateEventObserver = Observer<UpdateEvent>;
export type DeleteEventObserver = Observer<DeleteEvent>;

export type TodosEventObserver = Observer<AddEvent | UpdateEvent | DeleteEvent>;
export type TodosEventRecord = Record<TodosEventName, Todo>;

/**
 * Contains all the todo items.
 *
 * WARN: This may crash with `Array` interface. So, check on every ECMAScript
 * release.
 */
export class Todos extends Array<Todo> implements Observable<TodosEventName, TodosEventRecord> {
  #observers: Record<TodosEventName, Set<TodosEventObserver>> = {
    add: new Set(),
    update: new Set(),
    delete: new Set(),
  };

  add(todo: Todo) {
    this.push(todo);
    this.notifyObservers('add', todo);
  }

  /**
   * Updates a todo item. It changes the status of the todo item. When a todo
   * item has been completed, it sets the date at which the item was completed.
   * If the todo item already has a date of completion set, it resets the date.
   */
  update(todoId: string) {
    const todo = this.find(todo => todo.id === todoId);
    if (!todo) return;

    if (todo.dateCompletedTimestamp) todo.dateCompletedTimestamp = 0;
    else todo.dateCompletedTimestamp = Date.now();

    this.notifyObservers('update', todo);
  }

  /**
   * Deletes a todo item from the list.
   */
  delete(todoId: string) {
    const indexOfTodo = this.findIndex(todo => todo.id === todoId);
    if (indexOfTodo === -1) return;
    const [todo] = this.splice(indexOfTodo, 1);
    this.notifyObservers('delete', todo);
  }

  addObserver<Ev extends TodosEventName>(
    event: Ev,
    observer: Observer<Event<Ev, TodosEventRecord[Ev]>>
  ): void {
    this.#observers[event].add(observer as TodosEventObserver);
  }

  removeObserver<Ev extends TodosEventName>(
    event: Ev,
    observer: Observer<Event<Ev, TodosEventRecord[Ev]>>
  ): void {
    this.#observers[event].delete(observer as TodosEventObserver);
  }

  notifyObservers<Ev extends TodosEventName>(
    event: Ev,
    payload: TodosEventRecord[Ev]
  ): void {
    for (const notify of this.#observers[event]) notify({ name: event, payload });
  }
}
