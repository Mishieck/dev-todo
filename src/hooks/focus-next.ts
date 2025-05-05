import { useFocus } from "ink";
import { INPUT_ID } from "../components/input";
import { todoFocus } from "../objects/todo-focus";
import { todos } from "../objects/todos";

export const getNextFocusableItem = (direction: -1 | 1): string | void => {
  const current = todoFocus.values().next().value;
  const items = todos.toSorted();
  if (!current) return items.at(direction === 1 ? 0 : -1)?.id;
  const indexOfCurrent = items.findIndex(todo => todo.id == current);
  if (indexOfCurrent === -1) return;
  const indexOfNext = indexOfCurrent + direction;
  if (indexOfNext === -1 || indexOfNext === items.length) return INPUT_ID;
  return items.at(indexOfNext)?.id;
};

export const useFocusNext = () => {
  const { focus } = useFocus();

  return (direction: -1 | 1) => {
    const nextId = getNextFocusableItem(direction);
    if (typeof nextId === 'string') focus(nextId);
  };
};
