import { Component, OnInit } from '@angular/core';
import {SimplePageScroll} from "ng2-simple-page-scroll";
import {Userprofile} from "../userprofile/models/userprofile";
import {UsersessionsService} from "./usersessions.service";
import {Session} from "../components/session-card/session";

@Component({
  selector: 'app-usersessions',
  templateUrl: './usersessions.component.html',
  styleUrls: ['./usersessions.component.css']
})
export class UsersessionsComponent implements OnInit {
  currentUser: Userprofile = new Userprofile;
  constructor(private userSessionsService: UsersessionsService) { }

  ngOnInit() {
    var loggedInUser = JSON.parse(localStorage.getItem("profile"));
    var riftTag = loggedInUser.nickname;
    this.getUserSessions(riftTag);
  }

  getUserSessions(riftTag: string) {
    this.currentUser.rifterSessions = [];
    this.userSessionsService.getUserRifterSessions(riftTag).subscribe(
      resBody => {
        for (var i = 0; i < resBody.rifterSessions.length; i++) {
          var currDateMS = resBody.rifterSessions[i].sessionTime;
          var date = new Date(currDateMS);
          var currSession = new Session();
          currSession.firstName = resBody.firstName;
          currSession.lastName = resBody.lastName;
          currSession.riftTag = resBody.riftTag;
          currSession.rifterRating = resBody.rifterRating;
          currSession.hostId = resBody.rifterSessions[i].hostId;
          currSession.sessionCost = resBody.rifterSessions[i].sessionCost;
          currSession.methodOfContact = resBody.rifterSessions[i].methodOfContact;
          currSession.sessionDuration = resBody.rifterSessions[i].sessionDuration;
          currSession.title = resBody.rifterSessions[i].title;
          currSession.sessionTime = date;
          currSession.id = resBody.rifterSessions[i].id;
          this.currentUser.rifterSessions.push(currSession);
        }
      },
      err => {
        console.log(err);
      }
    );
    console.log(this.currentUser.rifterSessions);
  }
}
