import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-api-key',
  templateUrl: './api-key.component.html',
  styleUrls: ['./api-key.component.css']
})
export class ApiKeyComponent implements OnInit {
  apiForm: FormGroup;
  submitted = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.apiForm = this.formBuilder.group({
      apiKey: ['', Validators.required],
      secretKey: ['', Validators.required],
      exchange: ['', Validators.required]
    });
    this.http.get<any>(`api-keys`).subscribe( a => {
        console.log(a);
        this.apiForm.setValue({
          apiKey: a.apiKey,
          secretKey: a.apiSecret,
          exchange: a.exchange
        });
    });
  }
  get fval() { return this.apiForm.controls; }

  onFormSubmit() {
    this.submitted = true;
    if (this.apiForm.invalid) {
      return;
    }

    this.http.post<any>(`api-keys`,
      {
        apiKey: this.fval.apiKey.value,
        apiSecret: this.fval.secretKey.value,
        exchange: this.fval.exchange.value
      }).subscribe(a => {
        alert('Key has been updated');
      }, error => alert('Error occured ' + error.message) );
  }

  toggleFn() {
    this.hide = !this.hide;
  }

}
