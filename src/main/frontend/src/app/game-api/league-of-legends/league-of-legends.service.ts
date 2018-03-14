import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";

@Injectable()
export class LeagueOfLegendsService {
  private riotUrl = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/';
  private apiKey = "RGAPI-279e8bf9-320f-48d9-965e-cb057d623358";

  constructor(private http: Http){}

  getSummonerInfo(summonerName) {
    return this.http.get("/api/riotSummoner/" + summonerName)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
