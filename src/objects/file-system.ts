import fs from 'node:fs/promises';
import type { TodoData } from "@/app/todo/data";
import { todos, type Todos } from "@/app/todos/object";
import type { BadgeColors } from '@/app/todo/components/with-badge';
import { readFileSync } from 'node:fs';

export type Configuration = {
  todoListFile: URL;
  actionColors: Record<string, BadgeColors>
};

export type ConfigurationJson = Partial<Omit<Configuration, 'todoListFile'> & {
  todoListFile: string;
}>;

export class FileSystem {
  static CONFIG_FILE_ENV_VAR = 'DEV_TODO_CONFIG';
  static defaultConfigFilePath = new URL('./config.json', import.meta.url);

  #todos: Todos;
  configuration: Configuration;

  constructor(todos: Todos) {
    this.#todos = todos;

    todos.addObserver('add', () => { this.write(); });
    todos.addObserver('delete', () => { this.write(); });
    todos.addObserver('update', () => { this.write(); });

    this.configuration = FileSystem.getConfiguration();
  }

  static defaultConfiguration: Configuration = {
    todoListFile: new URL('./todos.json', import.meta.url),
    actionColors: {}
  };

  static getConfiguration(): Configuration {
    const filePath = this.configFilePath;

    try {
      const text = readFileSync(filePath, 'utf8');
      if (!text) return this.defaultConfiguration;
      const configurationJson = JSON.parse(text) as ConfigurationJson;
      const { todoListFile, actionColors } = configurationJson;
      const configuration: Configuration = { ...this.defaultConfiguration };

      if (todoListFile) {
        configuration.todoListFile = new URL(correctFilePath(todoListFile));
      }

      if (actionColors) Object.assign(configuration.actionColors, actionColors);
      return configuration;
    } catch (_error) {
      return this.defaultConfiguration;
    }
  }

  static get configFilePath() {
    const filePath = process.env[FileSystem.CONFIG_FILE_ENV_VAR];

    return filePath
      ? new URL(correctFilePath(filePath))
      : this.defaultConfigFilePath;
  }

  async read(): Promise<Array<TodoData> | Error> {
    const filePath = this.configuration.todoListFile;
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
    const filePath = this.configuration.todoListFile;

    try {
      await fs.writeFile(
        filePath,
        JSON.stringify(this.#todos.items.map(todo => todo.toJSON()))
      );
    } catch (error) {
      return error as Error;
    }
  }
}

// TODO: Check to see if this works on Windows
export const correctFilePath = (path: string) =>
  /^[/\\]/.test(path) ? `file://${path}` : path;

export const fileSystem = new FileSystem(todos);
