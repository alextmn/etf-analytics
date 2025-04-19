import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  standalone: false
})
export class PortfolioComponent implements OnInit {
  portfolioItems: any[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.portfolio$.subscribe(items => {
      this.portfolioItems = items;
    });
  }

  removeFromPortfolio(ticker: string) {
    this.portfolioService.removeFromPortfolio(ticker);
  }
}
