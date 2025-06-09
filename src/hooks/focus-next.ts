import { useFocus } from "ink";
import { INPUT_ID } from "@/app/input/ui";
import { todoFocus } from "@/objects/todo-focus";
import { todos } from "@/app/todos/object";

export const getNextFocusableItem = (direction: -1 | 1): string | void => {
  const current = todoFocus.values().next().value;
  if (!current) return todos.at(direction === 1 ? 0 : -1)?.id ?? INPUT_ID;
  const indexOfCurrent = todos.findIndex(todo => todo.id == current);
  if (indexOfCurrent === -1) return;
  const indexOfNext = indexOfCurrent + direction;
  if (indexOfNext === -1 || indexOfNext === todos.length) return INPUT_ID;
  return todos.at(indexOfNext)?.id;
};

export const useFocusNext = () => {
  const { focus } = useFocus();

  return (direction: -1 | 1) => {
    const nextId = getNextFocusableItem(direction);
    if (typeof nextId === 'string') focus(nextId);
  };
};
