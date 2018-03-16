import {Component, Inject, OnInit} from '@angular/core';
import {GAMES} from "../../../constants/games";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-edit-game-account',
  templateUrl: './edit-game-account.component.html',
  styleUrls: ['./edit-game-account.component.scss']
})
export class EditGameAccountComponent implements OnInit {
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
    };
    console.log(data);
  }
}
