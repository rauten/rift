export class FormData {
  sessionCreatorId: string = "";
  sessionCreatorRiftTag: string = "";
  sessionCreationTime: any;

  title: string = "";
  gameId: number;
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
    this.gameId = -1;
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
  gameId: number;
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
