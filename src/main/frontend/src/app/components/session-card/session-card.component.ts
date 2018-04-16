import {Component, OnInit, Input, TemplateRef} from '@angular/core';
import {SESSION_ICONS} from "../../constants/session-icon-variables";
import {Session} from "../../models/session";
import {UsersessionsService} from "../../usersessions/usersessions.service";
import {UserprofileService} from "../../userprofile/userprofile.service";
import {SessionRequest} from "../../models/session-request";
import {CONSOLE_ICONS} from "../../constants/console-icon-variables";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {GameAccount} from "../../models/game-account";
import {GameAccountService} from "../../userprofile/game-account/game-account.service";
import {SessionPageService} from "../../therift/riftsessions/session-page/session-page.service";

@Component({
  selector: 'app-session-card',
  templateUrl: 'session-card.component.html',
  styleUrls: ['session-card.component.scss']
})
export class SessionCardComponent implements OnInit {
  sessionIcon: string;
  consoleIcon: string;
  modalRef: BsModalRef;
  gameAccounts: GameAccount[] = [];
  accountId: number;
  clockIcon = "https://cms.bsu.edu/-/media/www/images/common/icons/clockiconwhite.png?h=250&la=en&w=250&hash=230DC7880F07ECED39ADE5B6649523BE395F9147";

  @Input() loggedInUserId: number;
  @Input() session: Session;
  @Input() request: SessionRequest;
  @Input() isLoggedIn: boolean;
  @Input() type: boolean;
  profile: any;

  constructor(private userSessionsService: UsersessionsService, private userProfileService: UserprofileService,
              private modalService: BsModalService, private gameAccountService: GameAccountService,) {
  }

  ngOnInit() {
    this.sessionIcon = SESSION_ICONS[this.session.gameId];
    this.consoleIcon = CONSOLE_ICONS[this.session.console];
  }

  changeStatus(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.getUserGameAccountsByGameId(this.session.gameId, this.loggedInUserId);
  }

  joinUserSession() {
    console.log(this.gameAccounts);
    let data = {
      "rifteeId": this.loggedInUserId,
      "hostId": this.session.hostId,
      "sessionId": this.session.id,
      "accepted": 1,
      "rifteeGameAccount": this.accountId
    };
    console.log(data);
    this.userSessionsService.joinUserSession(data);
    alert("Sent request");
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
}
