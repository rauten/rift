export class Session {
  content: string;
  creationTime: number;

  constructor(content: string, creationTime: number) {
    this.content = content;
    this.creationTime = creationTime;
  }
}
