import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import {EditGameAccountComponent} from "../edit-game-account/edit-game-account.component";

@Component({
  selector: 'app-view-game-accounts',
  templateUrl: './view-game-accounts.component.html',
  styleUrls: ['./view-game-accounts.component.scss']
})
export class ViewGameAccountsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
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
