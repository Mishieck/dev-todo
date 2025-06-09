import { describe, it, expect } from "bun:test";
import { Todos, type TodosEventName } from "./object";
import { Todo } from "@/app/todo/data";

describe('Todos', () => {
  it('should add and read todos', () => {
    const content = 'Learn Ink.';
    const todo = Todo.fromContent(content);
    const todos = new Todos(todo);
    expect(todos.items[0]).toMatchObject(todo);
  });

  it('should initialize todos', () => {
    const content = 'Learn Ink.';
    const todo = Todo.fromContent(content);
    const todos = new Todos();
    todos.initialize([todo]);
    expect(todos.items[0]).toMatchObject(todo);
  });


  it('should update todos', () => {
    const todo = Todo.fromContent('Learn Ink.');
    const todos = new Todos(todo);
    expect(todo.isCompleted).toEqual(false);
    todos.update(todo.id);
    expect(todo.isCompleted).toEqual(true);
    todos.update(todo.id);
    expect(todo.isCompleted).toEqual(false);
  });

  it('should delete todos', () => {
    const first = Todo.fromContent('Learn Ink.');
    const second = Todo.fromContent('Learn Bun.');
    const third = Todo.fromContent('Learn React.');
    const todos = new Todos(first, second, third);
    todos.delete(second.id);
    const actualIds = todos.items.map(({ id }) => id);
    expect(actualIds).toEqual([first.id, third.id]);
    todos.delete(first.id);
    expect(todos.items[0]).toMatchObject({ id: third.id });
    todos.delete(third.id);
    expect(todos.items.length).toEqual(0);
  });

  it('should indicate if it is empty', () => {
    const todos = new Todos();
    expect(todos.isEmpty).toEqual(true);

    const todo = Todo.fromContent('Learn Ink.');
    todos.add(todo);
    expect(todos.isEmpty).toEqual(false);

    todos.delete(todo.id);
    expect(todos.isEmpty).toEqual(true);
  });

  it('should handle reactivity using the observer model', () => {
    const first = Todo.fromContent('Learn Ink.');
    const second = Todo.fromContent('Learn Bun.');
    const todos = new Todos(first);

    const observation: Record<TodosEventName, Todo | null> = {
      add: null,
      delete: null,
      initialize: null,
      update: null
    };

    todos.addObserver('add', ({ payload }) => observation.add = payload);
    todos.add(second);
    expect(observation.add).toBe(second);

    todos.addObserver('delete', ({ payload }) => observation.delete = payload);
    todos.delete(second.id);
    expect(observation.delete).toBe(second);

    todos.addObserver('update', ({ payload }) => observation.update = payload);
    todos.update(first.id);
    expect(observation.update).toBe(first);
  });
});
