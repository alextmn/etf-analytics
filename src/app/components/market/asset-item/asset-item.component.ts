import { Component, Input } from '@angular/core';
import { TickerResolver } from '../../../app-config';
import { PortfolioService } from '../../../services/portfolio.service';

@Component({
  selector: 'app-asset-item',
  templateUrl: './asset-item.component.html',
  styleUrls: ['./asset-item.component.css'],
  standalone: false
})
export class AssetItemComponent {
  @Input() item: any = {};
  @Input() type: string = "";

  constructor(private portfolioService: PortfolioService) {}

  resolve(a: string) {
    return TickerResolver(a);
  }

  get assetColor() {
    return this.item.last_signal > 0 ? '#27ae60' : '#e74c3c';
  }

  addToPortfolio() {
    if (!this.item?.ticker) {
      console.error('Invalid item:', this.item);
      return;
    }
    this.portfolioService.addToPortfolio(this.item.ticker);
  }

  isInPortfolio(): boolean {
    return this.portfolioService.isInPortfolio(this.item.ticker);
  }
}
