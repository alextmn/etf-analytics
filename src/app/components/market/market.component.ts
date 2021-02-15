import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Setting } from 'src/app/app-config';



@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  
  CONFIG = Setting
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
      await this.http.get<any>(this.CONFIG[this.marketType].url+`?r=${Math.random()}`).toPromise();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 3 : 4;
  }


}
