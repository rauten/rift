import { Component, OnInit } from '@angular/core';
import {SearchBarService} from "./search-bar.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  users: any;
  sessions: any;
  searchQuery: string = "";

  constructor(private searchBarService: SearchBarService) { }

  ngOnInit() {
  }

  getSearchResults() {
    this.searchBarService.getSearchResults(this.searchQuery).subscribe(
      resBody => {
        console.log(resBody);
      }
    )
  }
}
