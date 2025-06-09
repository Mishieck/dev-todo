import type { Observable, Observer, Event } from "@mishieck/observable";

export type FocusEventName = 'update';
export type FocusEvent = Event<FocusEventName, boolean>;
export type FocusObserver = Observer<FocusEvent>;
export type FocusEventRecord = Record<FocusEventName, boolean>;
export type FocusObservable = Observable<FocusEventName, FocusEventRecord>;

/**
 * Keeps track of focused todo items.
 *
 * WARN: This may crash with `Set` interface. So, check on every ECMAScript
 * release.
 */
export class TodoFocus extends Set<string> implements FocusObservable {
  #observers: Record<FocusEventName, Set<FocusObserver>> = { update: new Set() };

  get isFocused() {
    return this.size > 0;
  }

  addObserver<Ev extends "update">(
    event: Ev,
    observer: Observer<Event<Ev, FocusEventRecord[Ev]>>
  ): void {
    this.#observers[event].add(observer as FocusObserver);
  }

  removeObserver<Ev extends "update">(
    event: Ev,
    observer: Observer<Event<Ev, FocusEventRecord[Ev]>>
  ): void {
    this.#observers[event].delete(observer as FocusObserver);
  }

  notifyObservers<Ev extends "update">(
    event: Ev,
    payload: FocusEventRecord[Ev]
  ): void {
    for (const notify of this.#observers[event])
      notify({ name: event, payload });
  }

  override add(value: string): this {
    super.add(value);
    this.notifyObservers('update', this.isFocused);
    return this;
  }

  override delete(value: string): boolean {
    const result = super.delete(value);
    this.notifyObservers('update', this.isFocused);
    return result;
  }
}


export const todoFocus = new TodoFocus();
