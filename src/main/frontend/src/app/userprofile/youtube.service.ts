import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";

@Injectable()
export class YoutubeService {

  constructor(private http: Http){}

  getYouTubeUsername(code) {
    return this.http.get("/api/verifyYoutube/" + code)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
