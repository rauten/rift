import { Component, OnInit } from '@angular/core';
import {SearchBarService} from "../../components/search-bar/search-bar.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-riftsessions',
  templateUrl: 'riftsessions.component.html',
  styleUrls: ['riftsessions.component.scss']
})
export class RiftsessionsComponent implements OnInit {
  sub: any;
  searchQuery: string = "";
  sessions: any;
  users: any;
  isLoggedIn = false;

  constructor(private searchBarService: SearchBarService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.searchQuery = params['searchQuery'];
      console.log(JSON.parse(localStorage.getItem('profile')));
      if (JSON.parse(localStorage.getItem('profile')) != null) {
        this.isLoggedIn = true;
      }
      console.log(this.isLoggedIn);
      this.getUserSearchResults(this.searchQuery);
    })
  }

  getUserSearchResults(searchQuery: string) {
    this.searchBarService.getSearchResults(searchQuery).subscribe(
      resBody => {
        this.users = resBody[0];
        this.sessions = resBody[1];
      }
    );
  }
}
