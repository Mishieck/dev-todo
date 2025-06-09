import { INPUT_ID } from "@/app/input/ui";
import { Todo, type TodoData } from "../todo/data";
import { type Event, Observable, type Observer } from "@mishieck/observable";
import { todoFocus } from "@/objects/todo-focus";

export type TodosEventName = 'initialize' | 'add' | 'update' | 'delete';
export type TodosEvent<Name extends TodosEventName> = Event<Name, Todo>;

export type InitializeEvent = TodosEvent<'initialize'>;
export type AddEvent = TodosEvent<'add'>;
export type UpdateEvent = TodosEvent<'update'>;
export type DeleteEvent = TodosEvent<'delete'>;

export type InitializeEventObserver = Observer<InitializeEvent>;
export type AddEventObserver = Observer<AddEvent>;
export type UpdateEventObserver = Observer<UpdateEvent>;
export type DeleteEventObserver = Observer<DeleteEvent>;

export type TodosEventObserver =
  Observer<InitializeEvent | AddEvent | UpdateEvent | DeleteEvent>;

export type TodosEventRecord = {
  add: Todo;
  delete: Todo;
  initialize: Array<Todo>;
  update: Todo;
};

/** Contains all the todo items. */
export class Todos extends Observable<TodosEventName, TodosEventRecord> {
  items: Array<Todo>;

  get isEmpty() {
    return this.items.length === 0;
  }

  constructor(...items: Array<Todo>) {
    super(['add', 'delete', 'initialize', 'update']);
    this.items = items;
  }

  /** Adds initial todo items. */
  initialize(todos: Array<TodoData>) {
    this.items.push(...todos.map(data => new Todo(data)));
    this.notifyObservers('initialize', this.items);
  }

  add(todo: Todo) {
    this.items.unshift(todo);
    this.notifyObservers('add', todo);
  }

  /**
   * Updates a todo item. It changes the status of the todo item. When a todo
   * item has been completed, it sets the date at which the item was completed.
   * If the todo item already has a date of completion set, it resets the date.
   */
  update(todoId: string) {
    const todo = this.items.find(todo => todo.id === todoId);
    if (!todo) return;

    if (todo.dateCompletedTimestamp) todo.dateCompletedTimestamp = 0;
    else todo.dateCompletedTimestamp = Date.now();

    this.notifyObservers('update', todo);
  }

  /** Deletes a todo item from the list. */
  delete(todoId: string) {
    const indexOfTodo = this.items.findIndex(todo => todo.id === todoId);
    if (indexOfTodo === -1) return;
    const [todo] = this.items.splice(indexOfTodo, 1);
    this.notifyObservers('delete', todo);
  }

  getNextFocusableItem(direction: -1 | 1): string | void {
    const current = todoFocus.values().next().value;
    const items = this.items.toSorted();
    if (!current) return items.at(direction === 1 ? 0 : -1)?.id;
    const indexOfCurrent = items.findIndex(todo => todo.id == current);
    if (indexOfCurrent === -1) return;
    const indexOfNext = indexOfCurrent + direction;
    if (indexOfNext === -1 || indexOfNext === items.length) return INPUT_ID;
    return items.at(indexOfNext)?.id;
  }
}

export const todos = new Todos();
