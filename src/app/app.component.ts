import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './services/portfolio.service';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'cognitive-ui';

  isExpanded = true;
  constructor(
    public portfolioService: PortfolioService,
    //private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog) {}

  ngOnInit(): void {
  //  this.breakpointObserver
  //     .observe(['(min-width: 600px)'])
  //     .subscribe((state: BreakpointState) => {
  //       if (state.matches) {
  //         this.isExpanded = true;
  //       } else {
  //         this.isExpanded = false;
  //       }
  //     });
  }


}
