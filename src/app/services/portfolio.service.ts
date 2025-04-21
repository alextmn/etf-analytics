import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly STORAGE_KEY = 'portfolio_tickers';
  private portfolioSubject = new BehaviorSubject<string[]>([]);
  portfolio$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.loadPortfolio();
  }

  private async loadPortfolio() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const tickers = JSON.parse(stored) as string[];
      this.portfolioSubject.next(tickers);
      await this.updatePortfolioData();
    }
  }

  private async updatePortfolioData() {
    const tickers = this.portfolioSubject.value;
    const items = [];
    let totalRatio = 0;
    
    // First pass: collect data and calculate total ratio
    for (const ticker of tickers) {
      if (typeof ticker !== 'string') {
        console.error('Invalid ticker:', ticker);
        continue;
      }
      
      try {
        // Try all possible suffix variants
        let data;
        let successfulSuffix = '';
        const suffixes = ['', '-USD', '=X'];
        
        for (const suffix of suffixes) {
          try {
            data = await this.http.get<any>(`assets/${ticker}${suffix}.json?r=${Math.random()}`).toPromise();
            successfulSuffix = suffix; // Store the successful suffix
            break; // If successful, exit the loop
          } catch {
            // Continue to next suffix if this one fails
            continue;
          }
        }
        
        if (!data) {
          throw new Error('No data found for any suffix variant');
        }

        if (data) {
          const ratio = data.last_signal_ratio * 100;
          totalRatio += ratio;
          items.push({
            ticker,
            tickerWithSuffix: ticker + successfulSuffix, // Store the full ticker with suffix
            signal: {
              last_signal: data.last_signal,
              last_price: data.last_price,
              last_signal_ratio: ratio,
              max_prob: data.max_prob,
              avg_return_pct: data.avg_return_pct * 100,
              avg_active_return_pct: data.avg_active_return_pct * 100,
              allocation: 0 // Will be set in second pass
            }
          });
        }
      } catch (error) {
        console.error(`Error loading data for ${ticker}:`, error);
      }
    }
    // cash
    totalRatio += 100;

    // Second pass: calculate allocations
    items.forEach(item => {
      const allocation = (item.signal.last_signal_ratio / totalRatio) * 100;
      item.signal.allocation = allocation;
    });
    
    this.portfolio$.next(items);
  }

  private savePortfolio(tickers: string[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tickers));
    this.portfolioSubject.next(tickers);
    this.updatePortfolioData();
  }

  addToPortfolio(ticker: any) {
    const tickerStr = typeof ticker === 'string' ? ticker : ticker?.ticker;
    if (!tickerStr || typeof tickerStr !== 'string') {
      console.error('Invalid ticker:', ticker);
      return;
    }

    const current = this.portfolioSubject.value;
    if (!current.includes(tickerStr)) {
      this.savePortfolio([...current, tickerStr]);
    }
  }

  async removeFromPortfolio(ticker: string) {
    const currentPortfolio = this.portfolioSubject.getValue();
    const updatedPortfolio = currentPortfolio.filter(item => item !== ticker);
    this.portfolioSubject.next(updatedPortfolio);
    this.updateLocalStorage(updatedPortfolio);
    await this.updatePortfolioData(); // Refresh the portfolio data
  }

  async clearPortfolio() {
    this.portfolioSubject.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
    this.portfolio$.next([]); // Clear the portfolio data immediately
  }

  isInPortfolio(ticker: string): boolean {
    return this.portfolioSubject.value.includes(ticker);
  }

  getPortfolio(): string[] {
    return this.portfolioSubject.value;
  }

  private updateLocalStorage(portfolio: string[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(portfolio));
  }
}
