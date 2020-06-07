import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-api-key',
  templateUrl: './api-key.component.html',
  styleUrls: ['./api-key.component.css']
})
export class ApiKeyComponent implements OnInit {
  apiForm: FormGroup;
  submitted = false;
  hide = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.apiForm = this.formBuilder.group({
      apiKey: ['', Validators.required],
      secretKey: ['', Validators.required]
    });
  }
  get fval() { return this.apiForm.controls; }

  onFormSubmit() {
    this.submitted = true;
    if (this.apiForm.invalid) {
      return;
    }
  }

  toggleFn() {
    this.hide = !this.hide;
  }

}
