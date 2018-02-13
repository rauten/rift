import { Component, OnInit } from '@angular/core';
import {SearchBarService} from "../../components/search-bar/search-bar.service";
import {ActivatedRoute} from "@angular/router";
import {Session} from "../../models/session";

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

  constructor(private searchBarService: SearchBarService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.searchQuery = params['searchQuery'];
      console.log(JSON.parse(localStorage.getItem('profile')));
      if (JSON.parse(localStorage.getItem('profile')) != null) {
        this.isLoggedIn = true;
      }
      console.log(this.isLoggedIn);
      this.getUserSearchResults(this.searchQuery);
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
          currSession.game = resBody[1][i].game;
          this.sessions.push(currSession);
        }
        console.log(this.sessions);
      }
    );
  }
}
