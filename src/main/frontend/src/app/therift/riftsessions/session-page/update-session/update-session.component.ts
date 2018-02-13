import { Component, OnInit, Input } from '@angular/core';
import {Session} from "../../../../models/session";
import {SessionDateTime} from "./data/sessionDateTime";
import {UpdateSessionService} from "./data/update-session.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-session',
  templateUrl: './update-session.component.html',
  styleUrls: ['./update-session.component.scss']
})
export class UpdateSessionComponent implements OnInit {
  title = "Update this session";
  currentSession: Session = new Session();
  currentSessionDateTime: SessionDateTime = new SessionDateTime();
  sub: any;
  sessionId: number;
  @Input() updateSessionData;

  constructor(private updateSessionService: UpdateSessionService, private route: ActivatedRoute) {
    this.sub = this.route.parent.params.subscribe(params => {
      this.sessionId = params["sessionId"];
    });
  }

  ngOnInit() {
    this.currentSession = this.updateSessionService.getSessionData();
    this.updateSessionData = this.updateSessionService.getFormData();
  }

  save() {
    this.updateSessionService.setSessionData(this.currentSession, this.currentSessionDateTime);
    var timeMS = this.timeToMilliseconds(this.updateSessionData.sessionTime) + this.updateSessionData.sessionDate.getTime();
    let data = {
      "id": this.sessionId,
      "title": this.updateSessionData.title,
      "game": this.updateSessionData.game,
      "console": this.updateSessionData.console,
      "numSlots": this.updateSessionData.numSlots,
      "sessionCost": this.updateSessionData.sessionCost,
      "sessionTime": timeMS,
      "sessionDuration": "1:00:00"
    };
    console.log(data);
    this.updateSessionService.updateUserSession(data);
  }

  timeToMilliseconds(time: string) {
    var list = time.split(":");
    var hour = (+list[0]);
    var minute = (+list[1]);
    var seconds = (hour * 60 * 60) + (minute * 60);
    return seconds * 1000;
  }
}
