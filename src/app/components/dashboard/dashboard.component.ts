import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cryptos = {
    USDT: {Value: 4.55, USD: 5333.5},
    BTC: {Value: .55, USD: 6545},
    XRP: {Value: 54354, USD: 5466},
    LTC: {Value: 233, USD: 4322},
    BCH: {Value: 2343, USD: 876},
  };
  objectKeys = Object.keys;
  constructor() { }

  ngOnInit(): void {

  }

}
