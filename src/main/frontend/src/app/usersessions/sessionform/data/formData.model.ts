export class FormData {
  sessionCreatorId: string = "";
  sessionCreatorRiftTag: string = "";
  sessionCreationTime: any;

  title: string = "";
  game: string = "";
  console: string = "";

  numSlots: string = "";
  sessionCost: string = "";

  sessionDate: any;
  sessionTimes: any;
  sessionDuration: any;

  clear() {
    this.sessionCreatorId = "";
    this.sessionCreatorRiftTag = "";
    this.sessionCreationTime = "";
    this.title = "";
    this.game = "";
    this.console = "";
    this.numSlots = "";
    this.sessionCost = "";
    this.sessionDate = "";
    this.sessionTimes = "";
    this.sessionDuration = "";
  }

}

export class Step1 {
  title: string = "";
  game: string = "";
  console: string = "";
}

export class Step2 {
  numSlots: string;
  sessionCost: string;
}

export class Step3 {
  sessionDate: any;
  sessionTimes: any;
  sessionDuration: any;
}
