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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordComponent,
    DashboardComponent,
    ApiKeyComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  // providers: [httpMockProvider],
  providers: [environment.httpMock ? httpMockProvider : httpOAuth2Provider],
  bootstrap: [AppComponent]
})
export class AppModule { }
