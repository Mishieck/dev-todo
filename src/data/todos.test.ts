import { describe, it, expect } from "bun:test";
import { Todos } from "./todos";
import { Todo } from "./todo";

describe('Todos', () => {
  it('should add and read todos', () => {
    const content = 'Learn Ink.';
    const todo = Todo.fromContent(content);
    const todos = new Todos([todo]);
    expect(todos.read().next().value).toMatchObject(todo);
  });

  it('should delete todos', () => {
    const first = Todo.fromContent('Learn Ink.');
    const second = Todo.fromContent('Learn Bun.');
    const third = Todo.fromContent('Learn React.');
    const todos = new Todos([first, second, third]);
    todos.del(second.id);
    const actualIds = [...todos.read()].map(({ id }) => id);
    expect(actualIds).toMatchObject([first.id, third.id]);
    todos.del(first.id);
    expect(todos.read().next().value).toMatchObject({ id: third.id });
    todos.del(third.id);
    expect(todos.read().next()).toMatchObject({ done: true });
  });
});
