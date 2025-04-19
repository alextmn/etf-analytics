import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HighchartsChartModule } from 'highcharts-angular';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIcon} from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MarketComponent } from './components/market/market.component';
import { AssetTabComponent } from './components/asset-tab/asset-tab.component';
import { AssetItemComponent } from './components/market/asset-item/asset-item.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

const routes: Routes = [
  { path: '', component: MarketComponent  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'market', component: MarketComponent }];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AssetTabComponent,
    AssetItemComponent,
    MarketComponent,
    PortfolioComponent
  ],
  imports: [
    BaseChartDirective ,
    HttpClientModule,
    MatGridListModule,
    MatMenuModule,
    MatIcon,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSidenavModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDialogActions,
    MatDialogModule,
    MatIconModule,
    MatSliderModule,
    MatCheckboxModule,
    MatCardModule,
    NgxGoogleAnalyticsModule.forRoot('G-6S001VRE31'),
    NgxGoogleAnalyticsRouterModule,
    HighchartsChartModule,
    RouterModule.forRoot(routes, { useHash: false })

  ],
  providers: [provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent]
})

export class AppModule { }
