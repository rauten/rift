export class Activity {
  notificationContent: string;
  createdTime: number;

  constructor(content: string, creationTime: number) {
    this.notificationContent = content;
    this.createdTime = creationTime;
  }
}
