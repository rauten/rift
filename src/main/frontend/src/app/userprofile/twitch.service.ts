import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";

@Injectable()
export class TwitchService {

  constructor(private http: Http){}

  getTwitchInfo(code) {
    return this.http.get("/api/verifyTwitch/" + code)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
