import { Component, OnInit } from '@angular/core';
import {SearchBarService} from "../../components/search-bar/search-bar.service";
import {ActivatedRoute} from "@angular/router";
import {Session} from "../../models/session";
import {UsersessionsService} from "../../usersessions/usersessions.service";
import {SessionRequest} from "../../models/session-request";
import {Userprofile} from "../../models/userprofile";
import {UserprofileService} from "../../userprofile/userprofile.service";

@Component({
  selector: 'app-riftsessions',
  templateUrl: 'riftsessions.component.html',
  styleUrls: ['riftsessions.component.scss']
})
export class RiftsessionsComponent implements OnInit {
  sub: any;
  searchQuery: string = "";
  sessions: Session[] = [];
  users: Userprofile[] = [];
  isLoggedIn = false;
  loggedInUser: Userprofile = new Userprofile();
  profile: any;

  constructor(private searchBarService: SearchBarService, private route: ActivatedRoute,
  private userSessionsService: UsersessionsService, private userProfileService: UserprofileService) {
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
    this.sessions = [];
    this.users = [];
    this.searchBarService.getSearchResults(searchQuery).subscribe(
      resBody => {
        var users = resBody[0];
        for (var i = 0; i < users.length; i++) {
          var currUser = new Userprofile();
          currUser.firstName = users[i].firstName;
          currUser.lastName = users[i].lastName;
          currUser.riftTag = users[i].riftTag;
          currUser.id = users[i].id;
          this.getUserProfilePicture(currUser.riftTag, currUser);
          this.users.push(currUser);
        }
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

  getUserProfilePicture(riftTag: string, user: Userprofile): string {
    console.log("Getting user's profile picture");
    this.userProfileService.getProfilePicture(riftTag).subscribe(
      resBody => {
        if (resBody.image == "") {
          user.profilePic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png"
        } else {
          user.profilePic = resBody.image;
        }
      }
    );
    return;
    // this.currentUser.profilePic = "https://s3.us-east-2.amazonaws.com/rift-profilepictures/" + riftTag +"profile-picture"
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
