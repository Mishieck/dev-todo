export abstract class TodoData {
  readonly id: string;
  readonly content: string;
  readonly dateCreatedTimestamp: number;
  dateCompletedTimestamp: number;

  constructor(data: TodoData) {
    const { id, content, dateCreatedTimestamp, dateCompletedTimestamp } = data;
    this.id = id;
    this.content = content;
    this.dateCreatedTimestamp = dateCreatedTimestamp;
    this.dateCompletedTimestamp = dateCompletedTimestamp;
  }
};

export class Todo extends TodoData {
  static defaultDate = new Date(0);

  static fromContent(content: string): Todo {
    return new Todo({
      id: this.generateId(),
      content,
      dateCreatedTimestamp: Date.now(),
      dateCompletedTimestamp: 0
    });
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
} 
