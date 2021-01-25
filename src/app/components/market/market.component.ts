import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  breakpoint = 4;
  assetList = []
  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 3 : 4;
    this.assetList = await this.http.get<any>(`assets/crypto_list.json`).toPromise();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 3 : 4;
  }
}
