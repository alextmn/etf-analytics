import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  cryptos = [];
  objectKeys = Object.keys;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(`balances`).subscribe( a => {
      this.cryptos = a;
    });
  }

}
