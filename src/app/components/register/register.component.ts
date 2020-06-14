import { Component, OnInit } from '@angular/core';
import { tap, finalize, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/authentication-service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordForm: FormGroup;
  loading = false;
  submitted = false;
  pwdError = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    const sameValidationFn = (control: FormGroup): Observable<ValidationErrors | null> => {
      const p1 = this.fval.newPassword1.value;
      const p2 = this.fval.newPassword2.value;
      return of(p1 === p2 ? null : { notMatch: true });
    };
    this.passwordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword1: ['', Validators.required],
      newPassword2: ['', Validators.required, sameValidationFn]
    });
  }

  get fval() { return this.passwordForm.controls; }
  l(s: any) {
    return JSON.stringify(s);
  }
  onFormSubmit() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    this.loading = true;
    this.pwdError = false;
    this.http.post<any>(`register-user`,
      {
        username: this.fval.email.value,
        password: this.fval.newPassword1.value
      }).pipe(
        switchMap( _ =>  this.authenticationService.login(
              this.fval.email.value, this.fval.newPassword1.value)),
        tap( _ => this.router.navigate(['/api-key'])),
        finalize(() => {
          this.loading = false;
          this.submitted = false;
          this.passwordForm.reset();
        }),
        catchError(e => {
          console.log(e.message);
          this.pwdError = true;
          return of({}); })
      ).subscribe();
  }
}
