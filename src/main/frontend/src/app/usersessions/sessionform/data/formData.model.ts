export class FormData {
  sessionCreatorId: string = "";
  sessionCreatorRiftTag: string = "";
  sessionCreationTime: any;

  title: string = "";
  game: string = "";
  console: string = "";

  numSlots: string = "";
  sessionCost: string = "";

  sessionDate: string = "";
  sessionTimes: string = "";

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
  sessionDate: string;
  sessionTimes: string;
}
