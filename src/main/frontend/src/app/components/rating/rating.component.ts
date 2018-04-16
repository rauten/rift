import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating;
  @Input() readonly;
  ratingPercent;

  constructor() { }

  ngOnInit() {
    this.ratingPercent = (this.rating/5) * 100;
  }

}
