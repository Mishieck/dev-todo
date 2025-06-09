
export abstract class TodoData {
  readonly id: string;
  readonly content: string;
  readonly dateCreatedTimestamp: number;
  readonly action: string | null;
  readonly category: string | null;
  dateCompletedTimestamp: number;

  constructor(data: TodoData) {
    const {
      id,
      content,
      dateCreatedTimestamp,
      dateCompletedTimestamp,
      action,
      category
    } = data;

    this.id = id;
    this.content = content;
    this.action = action;
    this.category = category;
    this.dateCreatedTimestamp = dateCreatedTimestamp;
    this.dateCompletedTimestamp = dateCompletedTimestamp;
  }
};

export type SyntaxMatches = Partial<{
  action: string;
  category: string;
  content: string;
}>;

export type TodoDataV010 = Omit<TodoData, 'action' | 'category'>;

export class Todo extends TodoData {
  static defaultDate = new Date(0);

  static syntax =
    /((?<action>[-a-z]+)(?:\((?<category>[-a-z\/]+)\))?:\s+)?(?<content>.+)/

  static getSyntaxMatches(text: string): SyntaxMatches {
    return text.match(Todo.syntax)?.groups as SyntaxMatches ?? {};
  }

  static fromContent(text: string): Todo {
    const { action = null, category = null, content = text } =
      this.getSyntaxMatches(text);

    return new Todo({
      id: this.generateId(),
      content,
      action,
      category,
      dateCreatedTimestamp: Date.now(),
      dateCompletedTimestamp: 0
    });
  }

  static fromDataV010(data: TodoDataV010): TodoData {
    return { ...data, action: null, category: null };
  }

  static generateId() {
    return crypto.randomUUID();
  }

  constructor(data: TodoData) {
    super(data);
  }

  get dateCreated(): Date {
    return new Date(this.dateCreatedTimestamp);
  }

  get dateCompleted(): Date {
    return this.dateCompletedTimestamp
      ? new Date(this.dateCompletedTimestamp)
      : Todo.defaultDate;
  }

  set dateCompleted(date: Date) {
    this.dateCompletedTimestamp = date.getTime();
  }

  get isCompleted(): boolean {
    return this.dateCompletedTimestamp !== 0;
  }

  toJSON(): TodoData {
    const {
      id,
      content,
      action,
      category,
      dateCreatedTimestamp,
      dateCompletedTimestamp
    } = this;

    return {
      id,
      content,
      action,
      category,
      dateCreatedTimestamp,
      dateCompletedTimestamp
    };
  }
} 
