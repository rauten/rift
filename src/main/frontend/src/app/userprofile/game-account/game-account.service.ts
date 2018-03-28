import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {GameAccount} from "../../models/game-account";
import {Session} from "../../models/session";

@Injectable()
export class GameAccountService {
  addGameAccountURL = "/api/gameaccount/create";
  updateGameAccountURL = "/api/gameaccount/update";

  constructor(private http: Http) {}

  addGameAccount(data): void {
    console.log("Adding game account");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.addGameAccountURL, data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe(
        data => {console.log(data);},
        err => console.log(err),
        () => console.log("Added game account")
      );
  }

  deleteGameAccountAndUpdateSession(gameAccountId) {
    return this.http.get("/api/gameaccount/usertableId/" + gameAccountId + "/info")
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUserGameAccounts(id): Observable<GameAccount> {
    console.log("Getting user's game accounts");
    return this.http.get("/api/gameaccount/usertableId/" + id + "/info")
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateGameAccount(data) {
    console.log("Adding game account");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.updateGameAccountURL, data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe(
        data => {console.log(data);},
        err => console.log(err),
        () => console.log("Added game account")
      );
  }

  getUserGameAccountsByGameID(gameId, riftId): Observable<GameAccount> {
    console.log("Getting user's game accounts by game Id");
    return this.http.get("/api/gameaccount/usertableId/" + riftId +  "/gameId/" + gameId)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteGameAccount(accountId) {
    console.log("Deleting game account");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete("/api/gameaccount/delete/"+accountId, options)
      .map((res:Response) => {
        return res.json();
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
  }
}


