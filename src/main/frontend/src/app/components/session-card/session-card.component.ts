import { Component, OnInit, Input } from '@angular/core';
import {SESSION_ICONS} from "../../constants/session-icon-variables";

@Component({
  selector: 'app-session-card',
  templateUrl: 'session-card.component.html',
  styleUrls: ['session-card.component.scss']
})
export class SessionCardComponent implements OnInit {
  @Input() hostName: string;
  @Input() hostRiftTag: string;
  @Input() hostRifterRating: number;
  @Input() title: string;
  @Input() cost: number;
  @Input() contact: string;
  @Input() duration: string;
  @Input() hits: number;
  @Input() day: string;
  @Input() month: string;
  @Input() time: string;
  @Input() console: string;
  @Input() game: string;
  @Input() id: number;
  sessionIcon: string;

  constructor() { }

  ngOnInit() {
    if(this.game == "League of Legends") {
      this.sessionIcon=SESSION_ICONS.leagueOfLegends;
    }
  }

}
