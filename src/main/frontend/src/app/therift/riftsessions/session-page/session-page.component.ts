import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SessionPageService} from "./session-page.service";
import {Session} from "../../../components/session-card/session";

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
        this.session.firstName = "Filler First Name";
        this.session.lastName = "Filler Last Name";
        this.session.methodOfContact = this.response.methodOfContact;
        this.session.title = this.response.title;
        this.session.hits = this.response.hits;
        this.session.sessionTime = this.response.sessionTime;
        this.session.sessionCost = this.response.sessionCost;
      }
    )
  }
}