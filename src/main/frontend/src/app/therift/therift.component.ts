import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserprofileService} from "../userprofile/userprofile.service";
import {TwitchService} from "../userprofile/twitch.service";

@Component({
  selector: 'app-therift',
  templateUrl: './therift.component.html',
  styleUrls: ['./therift.component.css']
})
export class TheriftComponent implements OnInit {
  sub: any;

  constructor(public auth: AuthService, private route: Router, private activatedRoute: ActivatedRoute,
              private twitchService: TwitchService) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      if(params['code']) {
        console.log('queryParams', params['code']);
        this.twitchService.getTwitchInfo(params['code']).subscribe(
          resBody => {
            console.log(JSON.parse(resBody.content).id_token);
          }
        );
      }
    });
  }

}
