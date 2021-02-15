import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpMockProvider } from './service/http-mock-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './service/authentication-service';
import { environment } from 'src/environments/environment';
import { httpOAuth2Provider } from './service/http-oauth2-interceptor';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApiKeyComponent } from './components/api-key/api-key.component';
import { RegisterComponent } from './components/register/register.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ChartsModule } from 'ng2-charts';
import { AssetTabComponent } from './components/asset-tab/asset-tab.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AssetItemComponent } from './components/market/asset-item/asset-item.component';
import { MarketComponent } from './components/market/market.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordComponent,
    DashboardComponent,
    ApiKeyComponent,
    RegisterComponent,
    WalletComponent,
    AssetTabComponent,
    AssetItemComponent,
    MarketComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    HighchartsChartModule,
    SocialLoginModule
  ],
  // providers: [httpMockProvider],
  providers: [
    environment.httpMock ? httpMockProvider : httpOAuth2Provider,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              'clientId'
              )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
