import { describe, it, expect } from "bun:test";
import { Todo, TodoData } from "./todo";

describe('Todo', () => {
  const content = 'Learn Ink.';
  const dateCreatedTimestamp = Date.now();
  const dateCompletedTimestamp = 0;

  const data: TodoData = {
    id: Todo.generateId(),
    content,
    dateCreatedTimestamp,
    dateCompletedTimestamp
  };

  it('should create todo with correct data', () => {
    const todo = new Todo(data);
    expect(todo.dateCreated.getTime()).toEqual(dateCreatedTimestamp);
    expect(todo.dateCompleted).toEqual(Todo.defaultDate);
  });

  it('should set date completed', () => {
    const todo = new Todo(data);
    const timestamp = Date.now();
    todo.dateCompleted = new Date(timestamp);
    expect(todo.dateCompleted.getTime()).toEqual(timestamp);
  });

  it('should create a todo from content', () => {
    const content = 'Learn Ink.';
    const todo = Todo.fromContent(content);
    expect(todo.content).toEqual(content);
  });

  it('should handle todo status', () => {
    const todo = Todo.fromContent('Learn Ink.');
    expect(todo.isCompleted).toEqual(false);
    todo.dateCompleted = new Date();
    expect(todo.isCompleted).toEqual(true);
  });
});
