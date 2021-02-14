import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cognitive-ui';

  isExpanded = true;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  get userName(): string {
    return this.authenticationService.currentUserValue?.userName;
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  changePassword() : void {
    //const dialogRef = this.dialog.open(ChangePasswordComponent);
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
