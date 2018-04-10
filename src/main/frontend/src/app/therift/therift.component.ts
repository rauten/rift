import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TwitchService} from "../userprofile/twitch.service";
import {UserprofileService} from "../userprofile/userprofile.service";
import {UpdateInfoService} from "../userprofile/update-info/data/update-info.service";
import {YoutubeService} from "../userprofile/youtube.service";

@Component({
  selector: 'app-therift',
  templateUrl: './therift.component.html',
  styleUrls: ['./therift.component.css']
})
export class TheriftComponent implements OnInit {
  sub: any;
  profile: any;
  loggedInUserId: any;
  sessionId: any;

  constructor(public auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute,
              private twitchService: TwitchService, private youtubeService: YoutubeService,
              private updateInfoService: UpdateInfoService,
              private userProfileService: UserprofileService) {
    this.profile = JSON.parse(localStorage.getItem("profile"));
    this.sessionId = localStorage.getItem("sessionId");
    if(this.profile){
      this.userProfileService.getUserId(this.profile.nickname).subscribe(
        resBody => {
          this.loggedInUserId = resBody.id;
        }
      )
    }
  }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      let authType = this.activatedRoute.snapshot.url[0].path;
      if(authType == "twitch") {
        this.twitchService.getTwitchInfo(params['code']).subscribe(
          resBody => {
            console.log(JSON.parse(resBody.content).id_token);
            let jwt = JSON.parse(resBody.content).id_token;
            this.twitchService.getTwitchUsername(jwt + ".").subscribe(
              resBody => {
                let data = {
                  "id": this.loggedInUserId,
                  "twitchAccount": resBody.username,
                  "riftTag": ""
                };
                console.log(data);
                this.updateInfoService.updateUser(data);
              }
            );
          }
        );
      } else if(authType == "youtube") {
        console.log("in youtube!");
        let code = params['code'];
        code = code.replace("/", "%252F");
        console.log(code);
        this.youtubeService.getYouTubeUsername(code).subscribe(
          resBody => {
            let data = {
              "id": this.loggedInUserId,
              "youtubeAccount": resBody.username,
              "riftTag": ""
            };
            console.log(data);
            this.updateInfoService.updateUser(data);
          }
        )
      }
    });
  }

}
