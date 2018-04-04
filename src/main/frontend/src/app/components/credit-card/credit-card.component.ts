import {Component, Input, OnInit} from '@angular/core';
import {CreditCard} from "../../models/credit-card";

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {
  @Input() creditCard: CreditCard;

  constructor() { }

  ngOnInit() {
  }

}
