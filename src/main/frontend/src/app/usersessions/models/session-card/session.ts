export class Session {
  firstName: string;
  lastName: string;
  riftTag: string;
  rifterRating: number;
  hostId: number;
  sessionCost: number;
  methodOfContact: string;
  sessionDuration: string;
  sessionTitle: string;
  sessionHits: number;
  sessionTime: any;

  constructor(firstName: string, lastName: string, riftTag: string, rifterRating: number,hostId: number,
              sessionCost: number, methodOfContact: string, sessionDuration: string, sessionTitle: string,
              sessionHits: number, sessionTime: any) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.riftTag = riftTag;
    this.rifterRating = rifterRating;
    this.hostId = hostId;
    this.sessionCost = sessionCost;
    this.methodOfContact = methodOfContact;
    this.sessionDuration = sessionDuration;
    this.sessionTitle = sessionTitle;
    this.sessionHits = sessionHits;
    this.sessionTime = sessionTime;
  }
}
