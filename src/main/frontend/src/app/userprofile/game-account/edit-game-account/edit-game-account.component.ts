import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import {GAMES} from "../../../constants/games";
import {MAT_DIALOG_DATA} from "@angular/material";
import {GameAccountService} from "../game-account.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Headers, RequestOptions, Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {UpdateSessionService} from "../../../therift/riftsessions/session-page/update-session/data/update-session.service";
import {SESSION_ICONS} from "../../../constants/session-icon-variables";
import {GameAccount} from "../../../models/game-account";
import {UsersessionsService} from "../../../usersessions/usersessions.service";

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
  modalRef: BsModalRef;

  sessionsToUpdate = new Map<number, number>();
  sessionIds: number[] = [];
  accountId: number;
  gameAccounts: GameAccount[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data, private gameAccountService: GameAccountService,
              private modalService: BsModalService, private http: Http, private updateSessionService: UpdateSessionService,
              private userSessionService: UsersessionsService) {
    this.games = GAMES;
    this.profile = JSON.parse(localStorage.getItem("profile"));
  }

  ngOnInit() {
    this.getUserSessionsByGameAccountId(this.data.account.id);
  }

  confirmDelete(changeAccounts: any) {
    let status: boolean;
    this.gameAccountService.deleteGameAccount(this.data.account.id).subscribe(
      resBody => {
        status = resBody.status;
        if (!status) {
          this.changeStatus(changeAccounts);
        }
      }
    )

  }

  editGameAccount(data) {
    this.gameAccountService.updateGameAccount(data);
  }

  editSessionsGameAccount() {
    console.log('in edit session');
    console.log(this.sessionIds);
    for(let i = 0; i < this.sessionIds.length; i++) {
      let currSessionId = this.sessionIds[i];
      let data = {
        "id": currSessionId,
        "gameAccountId": +this.accountId
      };
      this.sessionsToUpdate.set(currSessionId, +this.accountId);
      console.log(data);
    }
    console.log(this.sessionsToUpdate);
    this.deleteAndUpdateGameAccount(this.data.account.id, this.sessionsToUpdate);
  }

  changeStatus(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.getUserGameAccountsByGameId(this.data.account.gameId, this.data.riftId);
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

  getUserSessionsByGameAccountId(gameId) {
    this.sessionsToUpdate = new Map<number, number>();
    this.userSessionService.getUserSessionsByGameAccountId(gameId).subscribe(
      resBody => {
        console.log(resBody);
        for(let i = 0; i < resBody.length; i ++) {
          this.sessionIds.push(resBody[i].id);
        }
      }
    );
  }

  getUserGameAccountsByGameId(gameId, riftId) {
    this.gameAccountService.getUserGameAccountsByGameID(gameId, riftId).subscribe(
      resBody => {
        console.log(resBody);
        for(let i = 0; i < resBody.length; i++) {
          let currAccount = resBody[i];
          let account: GameAccount = new GameAccount();
          account.gameName = currAccount.game.game;
          account.gameId = currAccount.gameId;
          account.ign = currAccount.ign;
          account.id = currAccount.id;
          account.gameIcon = SESSION_ICONS[account.gameId];
          this.gameAccounts.push(account);
        }
      }
    )
  }

  deleteAndUpdateGameAccount(gameAccountId, data) {
    this.gameAccountService.deleteGameAccountAndUpdateSession(gameAccountId, data);
  }
}
