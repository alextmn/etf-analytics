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
    const allData = await this.http.get<any>(`assets/test-data-ticks.json`).toPromise();
    this.signalMaxTable = allData.maxs;
    this.signalMinTable = allData.mins;
    const data=allData.signal;
    const ticks = Object.keys(data.price).map(a => [parseInt(a)*1000, data.price[a]]);
    const magnitude = Object.keys(data.price).map(a => [parseInt(a)*1000, data.signal[a] - 1]);
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
        text: 'BTC to USD Price',
      },
      subtitle: {
        text: 'hover to see price and signals at points'
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
