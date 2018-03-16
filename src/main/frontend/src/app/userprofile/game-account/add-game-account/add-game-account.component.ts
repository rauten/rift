import {Component, Inject, OnInit} from '@angular/core';
import {GAMES} from "../../../constants/games";
import {UserprofileService} from "../../userprofile.service";
import {MAT_DIALOG_DATA} from "@angular/material";
import {GameAccountService} from "../game-account.service";

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

  constructor(@Inject(MAT_DIALOG_DATA) public data, private gameAccountService: GameAccountService) {
    this.games = GAMES;
    this.profile = JSON.parse(localStorage.getItem("profile"));
  }

  ngOnInit() {
  }

  addGameAccount(data) {
    this.gameAccountService.addGameAccount(data);
  }

  save() {
    let data = {
      "gameId": this.gameId,
      "ign": this.ign,
      "usertableId": this.data.loggedInUserId
    };
    console.log(data);
    this.addGameAccount(data);
  }
}
