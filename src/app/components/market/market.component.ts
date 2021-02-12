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
      name: 'Crypto',
      t: [
        { title: 'BTC', ticker:'BTC-USD', subTitle:'Bitcoin', icon:'sbi-btc'},
        { title: 'ETH', ticker:'ETH-USD', subTitle:'Etherium', icon:'sbi-eth'},
        { title: 'BCH', ticker:'BCH-USD', subTitle:'Bitcon Cash', icon:'sbi-bch'},
      ],
    },
    etf : {
      url: 'assets/etf_list.json',
      name: 'ETF',
      t: [
        { title: 'GLD', ticker:'GLD', subTitle:'Gold', icon:'G'},
        { title: 'IEF', ticker:'IEF', subTitle:'7-10 Year US Treasury', icon:'I'},
        { title: 'SPY', ticker:'SPY', subTitle:'S&P 500 Index', icon:'S'},
      ],

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
