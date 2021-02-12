import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  CONFIG = {
    crypto : {
      url: 'assets/crypto_list.json',
      name: 'Crypto'
    },
    etf : {
      url: 'assets/etf_list.json',
      name: 'ETF'
    },
    forex : {
      url: 'assets/forex_list.json',
      name: 'Forex'
    },
    sector : {
      url: 'assets/sector_list.json',
      name: 'Sector'
    },
    world : {
      url: 'assets/world_list.json',
      name: 'World'
    }
  };
  breakpoint = 4;
  assetList = []
  marketType:string;
  constructor(private http: HttpClient,
              private route: ActivatedRoute,) { }

  async ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 3 : 4;

    this.route.queryParams.subscribe(p => {
        this.marketType = p.type || 'etf' ;
        this.fetch();
    });
  }

  private async fetch() {
    this.assetList = 
      await this.http.get<any>(this.CONFIG[this.marketType].url).toPromise();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 3 : 4;
  }
}
