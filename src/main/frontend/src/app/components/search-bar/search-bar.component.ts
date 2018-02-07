import { Component, OnInit } from '@angular/core';
import {SearchBarService} from "./search-bar.service";
import {SearchUser} from "./models/search-user.model";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchQuery: string = "";
  constructor(private searchBarService: SearchBarService) { }

  ngOnInit() {
  }

  getUserSearchResults(searchQuery: string) {
    this.searchBarService.getSearchResults(searchQuery).subscribe(
      resBody => {
        console.log(resBody[0]);
        localStorage.setItem('userSearchResults', resBody[0]);
      }
    );
  }
}
