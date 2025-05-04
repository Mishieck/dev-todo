import fs from 'node:fs/promises';
import type { TodoData } from "../data/todo";
import type { Todos } from "./todos";

export class FileSystem {
  #todos: Todos;

  static todoListFilePathEnvVar = 'INK_BUN_TODO_LIST_FILE';

  constructor(todos: Todos) {
    this.#todos = todos;

    todos.addObserver('add', () => { this.write(); });
    todos.addObserver('delete', () => { this.write(); });
    todos.addObserver('update', () => { this.write(); });
  }

  static get filePath() {
    const filePath = process.env[FileSystem.todoListFilePathEnvVar];

    return filePath
      ? new URL(filePath)
      : new Error(`Todo list file environment variable is not set.`);
  }

  static async read(): Promise<Array<TodoData> | Error> {
    const filePath = this.filePath;
    if (filePath instanceof Error) return filePath;
    const fileContents = await fs.readFile(filePath);
    const textDecoder = new TextDecoder('utf-8');

    try {
      const text = textDecoder.decode(fileContents);
      const savedArray = JSON.parse(text) as Array<TodoData>;

      return savedArray instanceof Array
        ? savedArray as Array<TodoData>
        : new Error(
          `Todo list file contents are supposed to be an array of todo item data.`
        );
    } catch (error) {
      return error as Error;
    }
  }

  async write(): Promise<Error | void> {
    const filePath = FileSystem.filePath;
    if (filePath instanceof Error) return filePath;

    try {
      await fs.writeFile(
        filePath,
        JSON.stringify(this.#todos.map(todo => todo.toJSON()))
      );
    } catch (error) {
      return error as Error;
    }
  }
} 
