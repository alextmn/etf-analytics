import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LoginComponent } from './components/login/login.component';
import { SocialAuthService } from 'angularx-social-login';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'cognitive-ui';

  isExpanded = true;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: SocialAuthService,
    public dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
   this.authService.authState.subscribe((user) => {
      console.log(user);
   });
   this.breakpointObserver
      .observe(['(min-width: 600px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isExpanded = true;
        } else {
          this.isExpanded = false;
        }
      });
  }

  get userName(): string {
    return this.authenticationService.currentUserValue?.userName;
  }

  logout(): void {
    this.authenticationService.logout();
    this.authService.signOut();
    this.router.navigate(['/market']);
  }
  login(): void {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  changePassword() : void {
    const dialogRef = this.dialog.open(ChangePasswordComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
