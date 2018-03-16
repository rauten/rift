import {Component, Inject, OnInit} from '@angular/core';
import {GAMES} from "../../../constants/games";
import {UserprofileService} from "../../userprofile.service";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-add-game-account',
  templateUrl: './add-game-account.component.html',
  styleUrls: ['./add-game-account.component.scss']
})
export class AddGameAccountComponent implements OnInit {
  games: any;
  title = "Add a Game Account";
  gameId: any;
  ign: any;
  profile: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.games = GAMES;
    this.profile = JSON.parse(localStorage.getItem("profile"));
  }

  ngOnInit() {
  }

  save() {
    let data = {
      gameId: this.gameId,
      username: this.ign,
      id: this.data.loggedInUserId
    };
    console.log(data);
  }
}
