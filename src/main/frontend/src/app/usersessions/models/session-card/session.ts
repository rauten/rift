export class Session {
  hostId: number;
  sessionCost: number;
  methodOfContact: string;
  sessionDuration: string;
  sessionTitle: string;
  sessionHits: number;
  sessionDateTime: any;

  constructor(hostId: number, sessionCost: number, methodOfContact: string, sessionDuration: string, sessionTitle: string,
  sessionHits: number, sessionDateTime: any) {
    this.hostId = hostId;
    this.sessionCost = sessionCost;
    this.methodOfContact = methodOfContact;
    this.sessionDuration = sessionDuration;
    this.sessionTitle = sessionTitle;
    this.sessionHits = sessionHits;
    this.sessionDateTime = sessionDateTime;
  }
}
