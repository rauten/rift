import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {EditGameAccountComponent} from "../edit-game-account/edit-game-account.component";
import {GameAccountService} from "../game-account.service";
import {GameAccount} from "../../../models/game-account";

@Component({
  selector: 'app-view-game-accounts',
  templateUrl: './view-game-accounts.component.html',
  styleUrls: ['./view-game-accounts.component.scss']
})
export class ViewGameAccountsComponent implements OnInit {
  accounts: GameAccount[] = [];

  constructor(public dialog: MatDialog, private gameAccountService: GameAccountService, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.getUserGameAccounts(this.data.loggedInUserId);
  }

  editGameAccount(id) {
    this.dialog.open(EditGameAccountComponent, {
      height: '450px',
      width: '600px',
      data: {
        "ign": id,
        "id": "game account id being edited"
      }
    });
  }



}
