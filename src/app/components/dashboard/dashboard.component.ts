import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from "highcharts/highstock";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // cryptos = {
  //   USDT: {Value: 4.55, USD: 5333.5},
  //   BTC: {Value: .55, USD: 6545},
  //   XRP: {Value: 54354, USD: 5466},
  //   LTC: {Value: 233, USD: 4322},
  //   BCH: {Value: 2343, USD: 876},
  // };

  cryptos = [];
  signalMaxTable = [];
  signalMinTable = [];
  allData:any = {};

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  updateFlag = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(`balances`).subscribe(a => {
      this.cryptos = a;
    });
    this.chart();
  }

  private async chart() {
    this.allData = await this.http.get<any>(`assets/test-data-ticks.json`).toPromise();
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
