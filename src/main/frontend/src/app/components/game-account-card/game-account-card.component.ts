import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-account-card',
  templateUrl: './game-account-card.component.html',
  styleUrls: ['./game-account-card.component.scss']
})
export class GameAccountCardComponent implements OnInit {
  @Input() account;
  @Input() loggedInUserRiftTag;
  @Input() currentUserRiftTag;
  @Input() isLoggedIn;

  constructor() { }

  ngOnInit() {
  }

}
