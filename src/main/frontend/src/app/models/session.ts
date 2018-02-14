export class Session {
  id: number;
  firstName: string;
  lastName: string;
  riftTag: string;
  rifterRating: number;
  hostId: number;
  sessionCost: number;
  methodOfContact: string;
  sessionDuration: string;
  title: string;
  hits: number;
  sessionTime: any;
  rifterSessions: any;
  console: string;
  game: string;
  numSlots: number;
  type: boolean;

  slotsRemaining: number;
  usertable: any;

  // constructor(firstName: string, lastName: string, riftTag: string, rifterRating: number,hostId: number,
  //             sessionCost: number, methodOfContact: string, sessionDuration: string, sessionTitle: string,
  //             sessionHits: number, sessionTime: any) {
  //   this.firstName = firstName;
  //   this.lastName = lastName;
  //   this.riftTag = riftTag;
  //   this.rifterRating = rifterRating;
  //   this.hostId = hostId;
  //   this.sessionCost = sessionCost;
  //   this.methodOfContact = methodOfContact;
  //   this.sessionDuration = sessionDuration;
  //   this.title = sessionTitle;
  //   this.hits = sessionHits;
  //   this.sessionTime = sessionTime;
  // }
  constructor(){}
}
