import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TwitchService} from "../userprofile/twitch.service";
import {UserprofileService} from "../userprofile/userprofile.service";
import {UpdateInfoService} from "../userprofile/update-info/data/update-info.service";

@Component({
  selector: 'app-therift',
  templateUrl: './therift.component.html',
  styleUrls: ['./therift.component.css']
})
export class TheriftComponent implements OnInit {
  sub: any;
  profile: any;
  loggedInUserId: any;

  constructor(public auth: AuthService, private route: Router, private activatedRoute: ActivatedRoute,
              private twitchService: TwitchService, private updateInfoService: UpdateInfoService,
              private userProfileService: UserprofileService) {
    this.profile = JSON.parse(localStorage.getItem("profile"));
    this.userProfileService.getUserId('rauten3').subscribe(
      resBody => {
        this.loggedInUserId = resBody.id;
      }
    )
  }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      if(params['code']) {
        console.log('queryParams', params['code']);
        this.twitchService.getTwitchInfo(params['code']).subscribe(
          resBody => {
            console.log(JSON.parse(resBody.content).id_token);
            let jwt = JSON.parse(resBody.content).id_token;
            this.twitchService.getTwitchUsername(jwt + ".").subscribe(
              resBody => {
                console.log(resBody.username);
                let data = {
                  "id": this.loggedInUserId,
                  "twitchAccount": resBody.username,
                  "riftTag": ""
                };
                console.log(data + "herror");
                this.updateInfoService.updateUser(data);
              }
            );
          }
        );
      }
    });
  }

}
