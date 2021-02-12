import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-asset-tab',
  templateUrl: './asset-tab.component.html',
  styleUrls: ['./asset-tab.component.css']
})
export class AssetTabComponent implements OnInit {
  pchChange: number
  price: number

  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  @Input() chartStyle = 'gray';
  @Input() title: string;
  @Input() subTitle: string;
  @Input() icon: string;
  @Input() ticker: string;

  chartStyleMap= {
      orange: {
        borderColor: '#FF9149',
        gradient: 'rgba(255, 145, 73,0.4)',
        coinCss: 'cc-orange',
      },
      blue: {
        borderColor: '#1e9ff2',
        gradient: 'rgba(30,159,242,0.4)',
        coinCss: 'cc-blue',
      },
      gray: {
        borderColor: '#78909C',
        gradient: 'rgba(120, 144, 156,0.4)',
        coinCss: 'cc-gray',
      }
  };
  
 
  constructor(private http: HttpClient,) { }

  public lineChartData: ChartDataSets[] = [];

  public lineChartLabels: Label[] = ["1", "2", "3", "4", "5", "6", "7"];
  public lineChartOptions: ChartOptions = {
    responsive: !0,
    maintainAspectRatio: !1,
    legend: {
      display: !1
    },
    hover: {
      mode: "label"
    },
    scales: {
      xAxes: [{
        display: !1
      }],
      yAxes: [{
        display: !1,
      }]
    },
    title: {
      display: !1,
    }
  };
  public lineChartColors: Color[] = [
    {
      // backgroundColor: 'rgba(255, 145, 73,0.8)',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  ngOnInit(): void {
    console.log(this.chartStyleMap[this.chartStyle].borderColor)
  }
  async ngAfterViewInit() {
    const data = await this.http.get<any>(`assets/${this.ticker}.json`).toPromise();
    this.pchChange=(100 * data.last_change_pct);
    this.price = data.last_price;
    this.showData(data.last_prices);
  }
  showData(data) {
    this.lineChartData = [{
      label: "BTC",
      data: data,
      borderColor: this.chartStyleMap[this.chartStyle].borderColor,
      borderWidth: 1.5,
      pointRadius: 0
    }]

    const n = this.chartCanvas.nativeElement.getContext("2d");
    const r = n.createLinearGradient(0, 0, 0, 100)
    r.addColorStop(0, this.chartStyleMap[this.chartStyle].gradient)
    r.addColorStop(1, "rgba(255,255,255,0)")
    this.lineChartColors = [
      {
        backgroundColor: r
      }
    ]
  }

  
}
