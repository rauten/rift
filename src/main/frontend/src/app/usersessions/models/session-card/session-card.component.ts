import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss']
})
export class SessionCardComponent implements OnInit {
  @Input() title: string;
  @Input() cost: number;
  @Input() contact: string;
  @Input() duration: string;
  @Input() hits: number;
  @Input() day: string;
  @Input() month: string;
  @Input() time: string;

  constructor() { }

  ngOnInit() {
  }

}
