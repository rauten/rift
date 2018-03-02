import { Component, OnInit } from '@angular/core';
import {SearchBarService} from "../../components/search-bar/search-bar.service";
import {ActivatedRoute} from "@angular/router";
import {Session} from "../../models/session";
import {UsersessionsService} from "../../usersessions/usersessions.service";
import {SessionRequest} from "../../models/session-request";
import {Userprofile} from "../../models/userprofile";

@Component({
  selector: 'app-riftsessions',
  templateUrl: 'riftsessions.component.html',
  styleUrls: ['riftsessions.component.scss']
})
export class RiftsessionsComponent implements OnInit {
  sub: any;
  searchQuery: string = "";
  sessions: Session[] = [];
  users: any;
  isLoggedIn = false;
  loggedInUser: Userprofile = new Userprofile();
  profile: any;

  constructor(private searchBarService: SearchBarService, private route: ActivatedRoute,
  private userSessionsService: UsersessionsService) {
    this.profile = JSON.parse(localStorage.getItem('profile'))
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.searchQuery = params['searchQuery'];
      if (JSON.parse(localStorage.getItem('profile')) != null) {
        this.isLoggedIn = true;
      }
      this.getUserSearchResults(this.searchQuery);
      this.getUserSessionRequests(this.profile.nickname);
    })
  }

  getUserSearchResults(searchQuery: string) {
    this.searchBarService.getSearchResults(searchQuery).subscribe(
      resBody => {
        this.users = resBody[0];
        console.log(resBody[1]);
        for (var i = 0; i < resBody[1].length; i++) {
          var currDateMS = resBody[1][i].sessionTime;
          var date = new Date(currDateMS);
          var currSession = new Session();
          currSession.firstName = resBody[1][i].usertable.firstName;
          currSession.lastName = resBody[1][i].usertable.lastName;
          currSession.riftTag = resBody[1][i].usertable.riftTag;
          currSession.rifterRating = resBody[1][i].rifterRating;
          currSession.hostId = resBody[1][i].hostId;
          currSession.sessionCost = resBody[1][i].sessionCost;
          currSession.methodOfContact = resBody[1][i].methodOfContact;
          currSession.sessionDuration = resBody[1][i].sessionDuration;
          currSession.title = resBody[1][i].title;
          currSession.sessionTime = date;
          currSession.id = resBody[1][i].id;
          currSession.numSlots = resBody[1][i].numSlots;
          currSession.gameId = resBody[1][i].game_id;
          this.sessions.push(currSession);
        }
      }
    );
  }

  getUserSessionRequests(riftTag: string) {
    this.loggedInUser.sessionRequests = new Map<number, SessionRequest>();
    this.userSessionsService.getSessionRequests(riftTag).subscribe(
      resBody => {
        //noinspection TypeScriptUnresolvedVariable
        for (var i = 0; i < resBody.length; i++) {
          var request = new SessionRequest();
          request.accepted = resBody[i].accepted;
          request.hostId = resBody[i].hostId;
          request.rifteeId = resBody[i].rifteeId;
          request.sessionId = resBody[i].sessionId;
          this.loggedInUser.sessionRequests.set(request.sessionId, request);
        }
      }
    )
  }
}
