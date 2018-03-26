import {Component, Inject, OnInit} from '@angular/core';
import {GAMES} from "../../../constants/games";
import {MAT_DIALOG_DATA} from "@angular/material";
import {GameAccountService} from "../game-account.service";

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

  constructor(@Inject(MAT_DIALOG_DATA) public data, private gameAccountService: GameAccountService) {
    this.games = GAMES;
    this.profile = JSON.parse(localStorage.getItem("profile"));
  }

  ngOnInit() {
  }

  editGameAccount(data) {
    this.gameAccountService.updateGameAccount(data);
  }

  save() {
    let data = {
      "id": this.data.account.id,
      "ign": this.ign
    };
    console.log(data);
    this.editGameAccount(data);
    window.location.reload();
  }
}
