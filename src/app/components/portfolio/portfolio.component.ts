import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  standalone: false
})
export class PortfolioComponent implements OnInit {
  private readonly HELP_HIDDEN_KEY = 'helpHiddenUntil';
  portfolioItems: any[] = [];

  constructor(
    public portfolioService: PortfolioService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.portfolioService.portfolio$.subscribe(items => {
      this.portfolioItems = items;
    });
  }

  async removeFromPortfolio(ticker: string) {
    await this.portfolioService.removeFromPortfolio(ticker);
  }

  async resetAllData() {
    // Clear portfolio data
    await this.portfolioService.clearPortfolio();

    // Clear help sidebar preferences
    localStorage.removeItem(this.HELP_HIDDEN_KEY);

    // Show confirmation message
    this.snackBar.open('All data has been reset successfully', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar']
    });

    // Navigate to home page
    this.router.navigate(['/']);
  }
}
