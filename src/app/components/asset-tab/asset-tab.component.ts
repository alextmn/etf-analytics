import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-asset-tab',
  templateUrl: './asset-tab.component.html',
  styleUrls: ['./asset-tab.component.css'],
  standalone: false
})
export class AssetTabComponent implements OnInit {
  pchChange = 0
  price = 0

  @ViewChild('chartCanvas') chartCanvas?: ElementRef;
  @Input() chartStyle = 'gray';
  @Input() title: string = "";
  @Input() subTitle: string = "";
  @Input() icon: string = "";
  @Input() ticker: string = "";

  chartStyleMap: Record<string, any> = {
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

  public lineChartData: ChartDataset[] = [];

  public lineChartLabels: any[] = ["1", "2", "3", "4", "5", "6", "7"];
  lineChartOptions: ChartConfiguration['options']  = {
    responsive: false,
    maintainAspectRatio: false,
    // legend: {
    //   display: !1
    // },
    hover: {
      mode: "index"
    },
    scales: {
      x: {
        display: false,
        ticks: {
          //option 2, use callback to change labels to empty string
          callback: () => ('')
        }
      },
      y: {
        display: false,
      },
    },
    // title: {
    //   display: !1,
    // }
  }

  ngOnInit(): void {
    console.log(this.chartStyleMap[this.chartStyle].borderColor)
  }
  async ngAfterViewInit() {
    const data = await this.http.get<any>(`assets/${this.ticker}.json`).toPromise();
    this.pchChange=(100 * data.last_change_pct);
    this.price = data.last_price;
    this.showData(data.last_prices);
  }
  showData(data: any) {
    const n = this.chartCanvas!.nativeElement.getContext("2d");
    const r = n.createLinearGradient(0, 0, 0, 100)
    r.addColorStop(0, this.chartStyleMap[this.chartStyle].gradient)
    r.addColorStop(1, "rgba(255,255,255,0)")

    this.lineChartData = [{
      label: "BTC",
      data: data,
      borderColor: this.chartStyleMap[this.chartStyle].borderColor,
      borderWidth: 1.5,
      pointRadius: 0,
      tension: 0.4,
      fill: true,
      backgroundColor: r
    }]

    
    
  }

  get iconSbi() {
    return this.icon.indexOf('sbi') > -1 ? this.icon : null
  }

  
}
