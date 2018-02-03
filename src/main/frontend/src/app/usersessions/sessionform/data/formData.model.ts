export class FormData {
  sessionCreatorId: string = "";
  sessionCreatorRiftTag: string = "";
  sessionCreationTime: any;

  sessionTitle: string = "";
  sessionGame: string = "";
  sessionPlatform: string = "";

  sessionSlots: string = "";
  sessionCostPerSlot: string = "";

  sessionDate: string = "";
  sessionTimes: string = "";

  clear() {
    this.sessionCreatorId = "";
    this.sessionCreatorRiftTag = "";
    this.sessionCreationTime = "";
    this.sessionTitle = "";
    this.sessionGame = "";
    this.sessionPlatform = "";
    this.sessionSlots = "";
    this.sessionCostPerSlot = "";
    this.sessionDate = "";
    this.sessionTimes = "";
  }

}

export class Step1 {
  sessionTitle: string = "";
  sessionGame: string = "";
  sessionPlatform: string = "";
}

export class Step2 {
  sessionSlots: string;
  sessionCostPerSlot: string;
}

export class Step3 {
  sessionDate: string;
  sessionTimes: string;
}
