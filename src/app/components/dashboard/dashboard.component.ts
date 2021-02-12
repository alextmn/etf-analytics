import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from "highcharts/highstock";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  signalMaxTable = [];
  signalMinTable = [];
  allData:any = {};

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  updateFlag = false;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      this.chart(p.t);
    });
  }

  private async chart(ticker:string) {
    this.allData = await this.http.get<any>(`assets/${ticker}.json`).toPromise();
    this.signalMaxTable = this.allData.maxs;
    this.signalMinTable = this.allData.mins;
    const data=this.allData.signal;
    const ticks = Object.keys(data.price).map(a => [parseInt(a)*1000, data.price[a]]);
    const magnitude = Object.keys(data.price).map(a => [parseInt(a)*1000, data.signal[a]]);
    const activePrice = Object.keys(data.price).map(a => [parseInt(a)*1000, data.active_price[a]]);

    // Create the chart
    this.chartOptions = {
      rangeSelector: {
        selected: 2
      },

      legend: {
        enabled: true
      },
      title: {
        text: 'BTC to USD Backtest Using Asset-Cash Ratio',
      },
      subtitle: {
        text: 'Hover to see passive price and actively managed value at points'
      },
      yAxis: [{
        labels: {
          align: 'left'
        },
        height: '80%',
        resize: {
          enabled: true
        }
      }, {
        labels: {
          align: 'left'
        },
        top: '80%',
        height: '20%',
        offset: 0
      }],

      series: [{
        data: ticks,
        type: 'line',
        color: 'lightblue',
        name: 'Price',
      }, {
        data: activePrice,
        type: 'line',
        color: 'orange',
        name: 'Actively Managed',
      }, {
        name: 'Signal Strength',
        data: magnitude,
        yAxis: 1,
        type: 'column',
        color: "orange"
      }]
    };

    this.updateFlag = true;

      
    }
  }
