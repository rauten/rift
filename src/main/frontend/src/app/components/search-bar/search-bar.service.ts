import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/Rx";
import {Observable} from "rxjs";



@Injectable()
export class SearchBarService {
  constructor(private http: Http) {
  }

  getSearchResults(searchQuery: string) {
    console.log("running getSearchResults");
    return this.http.get("/api/user/search/searchParam=" + searchQuery)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
