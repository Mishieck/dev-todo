import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import fs from 'node:fs/promises';
import { FileSystem } from './file-system';
import { Todos, todos } from './todos';
import { Todo, TodoData } from '@/app/todo/data';

describe('FileSystem', () => {
  const filePath = new URL('./file-system/tests/todos.json', import.meta.url);
  process.env[FileSystem.todoListFilePathEnvVar] = filePath.toString();

  const clearTodoListFileContent = async () =>
    await fs.writeFile(filePath, JSON.stringify([])); // Clear file content

  beforeEach(clearTodoListFileContent);
  afterEach(clearTodoListFileContent);

  it('should write contents to file', async () => {
    const todo = Todo.fromContent('Learn Ink.');
    todos.add(todo);
    const fileSystem = new FileSystem(todos);
    const result = await fileSystem.write();
    expect(result).not.toBeInstanceOf(Error);

    const fileContents = await fs.readFile(filePath);
    const textDecoder = new TextDecoder('utf-8');
    const text = textDecoder.decode(fileContents);
    const savedArray = JSON.parse(text) as Array<TodoData>;
    expect(savedArray).toBeInstanceOf(Array);
    expect(savedArray[0]).toMatchObject(todo.toJSON());
  });

  it('should read file contents', async () => {
    const todo = Todo.fromContent('Learn Ink.');
    await fs.writeFile(filePath, JSON.stringify([todo]));
    const todoData = await FileSystem.read();
    expect(todoData).toBeInstanceOf(Array);

    const [savedTodo] = todoData as Array<TodoData>;
    expect(savedTodo).toMatchObject(todo.toJSON());
  });

  it('should react to Todos events', async () => {
    const ABORT_TIMEOUT_MS = 1000; // Enough for all updates
    const WATCH_EVENT_DELAY = 100; // Enough to separate events

    await fs.writeFile(filePath, JSON.stringify([]));
    const firstTodo = Todo.fromContent('Learn Ink.');
    const secondTodo = Todo.fromContent('Learn Ink.');
    const todos = new Todos(firstTodo);
    const fileSystem = new FileSystem(todos);

    const ac = new AbortController();
    const { signal } = ac;
    setTimeout(() => ac.abort(), ABORT_TIMEOUT_MS);

    const wait = () =>
      new Promise(resolve => setTimeout(resolve, WATCH_EVENT_DELAY));

    const watcher = fs.watch(filePath.toString(), { signal });

    todos.add(secondTodo);
    await wait();
    todos.update(secondTodo.id);
    await wait();
    todos.delete(firstTodo.id);
    const events: Array<fs.FileChangeInfo<string>> = [];

    try {
      for await (const event of watcher) events.push(event);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).name).toEqual('AbortError');
      expect(events.length).toEqual(3);
      expect(events.every(event => event.eventType === 'change')).toEqual(true);

      const result = await FileSystem.read();
      expect(result).toBeInstanceOf(Array);
      expect(result as Array<TodoData>).toHaveLength(1);
      expect((result as Array<TodoData>)[0]).toMatchObject(secondTodo.toJSON());
    }
  });
});
