import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SessionPageService} from "./session-page.service";
import {Session} from "../../../models/session";

@Component({
  selector: 'app-session-page',
  templateUrl: './session-page.component.html',
  styleUrls: ['./session-page.component.scss']
})
export class SessionPageComponent implements OnInit {
  sub: any;
  id: number;
  session: Session = new Session();
  response: any;

  constructor(private route: ActivatedRoute, private sessionPageService: SessionPageService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['sessionId'];
      this.getSessionById();
    });
  }

  getSessionById() {
    this.sessionPageService.getSessionById(this.id).subscribe(
      resBody => {
        console.log(resBody);
        this.response = resBody;
        this.session.id = this.response.id;
        this.session.riftTag = this.response.usertable.riftTag;
        this.session.rifterRating = this.response.usertable.rifterRating;
        this.session.firstName = this.response.usertable.firstName;
        this.session.lastName = this.response.usertable.lastName;
        this.session.methodOfContact = this.response.methodOfContact;
        this.session.title = this.response.title;
        this.session.hits = this.response.hits;
        this.session.sessionTime = this.response.sessionTime;
        this.session.sessionCost = this.response.sessionCost;
        this.session.numSlots = this.response.numSlots;
      }
    )
  }
}
