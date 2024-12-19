import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Setting } from '../../app-config';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
  standalone: false
})
export class MarketComponent implements OnInit {
  
  CONFIG = Setting
  breakpoint = 4;
  assetList = []
  marketType = "";
  showTopTab3 = true;
  showTopTab2 = true;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private breakpointObserver: BreakpointObserver,) { }

  async ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 3 : 4;

    this.route.queryParams.subscribe((p:any) => {
        this.marketType = p.type || 'etf' ;
        this.fetch();
    });
    
    this.breakpointObserver
    .observe(['(min-width: 1200px)'])
    .subscribe((state: BreakpointState) => {
      this.showTopTab3 = !!state.matches; 
    });

    this.breakpointObserver
    .observe(['(min-width: 900px)'])
    .subscribe((state: BreakpointState) => {
      this.showTopTab2 = !!state.matches; 
    });
  }

  private async fetch() {
    this.assetList = 
      await this.http.get<any>(this.CONFIG[this.marketType].url+`?r=${Math.random()}`).toPromise();
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 3 : 4;
  }




}
