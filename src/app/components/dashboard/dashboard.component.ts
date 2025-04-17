import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from "highcharts/highstock";
import { ActivatedRoute } from '@angular/router';
import { Setting } from '../../app-config';
import { TickerResolver } from '../../app-config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {

  CONFIG = Setting
  signalMaxTable: any ={};
  signalMinTable:any = {};
  allData:any = {};
  marketType = "";
  ticker = "";

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  updateFlag = false;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      this.chart(this.ticker = p['t']);
      this.marketType = p['type'];
    });
  }

  private async chart(ticker:string) {
    this.allData = await this.http.get<any>(`assets/${ticker}.json?r=${Math.random()}`).toPromise();
    this.signalMaxTable = this.allData.maxs;
    this.signalMinTable = this.allData.mins;
    const data=this.allData.signal;
    const ticks = Object.keys(data.price).map(a => [parseInt(a)*1000, data.price[a]]);
    const magnitude = Object.keys(data.price).map(a => [parseInt(a)*1000, data.signal[a]]);
    const activePrice = Object.keys(data.price).map(a => [parseInt(a)*1000, data.active_price[a]]);

    // Create the chart
    this.chartOptions = {
      chart: {
        backgroundColor: '#2c3e50',
        style: {
          color: '#fff'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(44, 62, 80, 0.95)',
        borderColor: '#3498db',
        borderRadius: 8,
        borderWidth: 1,
        style: {
          color: '#fff'
        },
        valueDecimals: 2,
        shadow: false,
        shared: true,
        useHTML: true
      },
      plotOptions: {
        series: {
          color: '#3498db',
          lineWidth: 2
        }
      },
      rangeSelector: {
        selected: 2
      },
      legend: {
        enabled: true,
        itemStyle: {
          color: '#fff'
        },
        itemHoverStyle: {
          color: '#3498db'
        }
      },
      title: {
        text: `${this.resolve} Backtest Using Asset-Cash Ratio`,
        style: {
          color: '#fff'
        }
      },
      subtitle: {
        text: 'Hover to see passive price and actively managed value at points',
        style: {
          color: 'rgba(255,255,255,0.8)'
        }
      },
      xAxis: {
        events: {
          setExtremes: function(e: any) {
            //console.log(e);
            const aMin = activePrice.find(a => a[0] >= e.min  ) ?? [1,1]
            const pMin = ticks.find(a => a[0] >= e.min ) ?? [1,1]
            const r = pMin[1] / aMin[1];
            const chart = e.target.chart;
            chart.series[1].update({
              data: activePrice.map(a=> [a[0], a[1] * r])
          }, true); 
          }
        },
      },
      yAxis: [{
        labels: {
          align: 'left',
          style: {
            color: '#fff'
          }
        },
        height: '80%',
        resize: {
          enabled: true
        },
        gridLineColor: 'rgba(255,255,255,0.1)'
      }, {
        labels: {
          align: 'left',
          style: {
            color: '#fff'
          }
        },
        top: '80%',
        height: '20%',
        offset: 0,
        gridLineColor: 'rgba(255,255,255,0.1)'
      }],

      series: [{
        data: ticks,
        type: 'line',
        color: '#3498db',
        name: 'Price',
        lineWidth: 2
      }, {
        data: activePrice,
        type: 'line',
        color: '#e67e22',
        name: 'Actively Managed',
        lineWidth: 2
      }, {
        name: 'Signal Strength',
        data: magnitude,
        yAxis: 1,
        type: 'column',
        color: '#e67e22',
        borderRadius: 2
      }]
    };

    this.updateFlag = true;

      
  }

   get resolve() {
    return  TickerResolver(this.ticker)
    } 
  }
