import { useState, useCallback } from 'react';

export type FocusObserver = (isFocused: boolean) => void;

export class TodoFocusObservable extends Set<string> {
  #observers: Record<string, FocusObserver> = {};

  $addObserver(id: string, observer: FocusObserver) {
    this.#observers[id] = observer;
  }

  $notifyObservers() {
    const isFocused = focusedItemSet.size > 0;
    for (const notify of Object.values(this.#observers)) notify(isFocused);
  }

  override add(value: string): this {
    super.add(value);
    this.$notifyObservers();
    return this;
  }

  delete(value: string): boolean {
    const result = super.delete(value);
    this.$notifyObservers();
    return result;
  }
}

const focusedItemSet = new TodoFocusObservable([]);

export const useTodoItemFocused = () => {
  const addItem = useCallback(
    (itemId: string) => {
      focusedItemSet.add(itemId);
      focusedItemSet.$notifyObservers();
    },
    []
  );

  const removeItem = useCallback(
    (itemId: string) => {
      focusedItemSet.delete(itemId);
      focusedItemSet.$notifyObservers();
    },
    []
  );


  return {
    isFocused: focusedItemSet.size > 0,
    focusedItems: focusedItemSet
  } as const;
};
