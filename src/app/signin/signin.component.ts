import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidationsService } from '../Services/validations/validations.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  validation;
  loading = false;

  constructor(private fb: FormBuilder,
    private validation_ser: ValidationsService) { }

  ngOnInit(): void {
    this.getValidations();
    this.SigninValidations();
  }

  getValidations() {
    this.validation = this.validation_ser.signin;
  }

  SigninValidations() {
    this.signinForm = this.fb.group({
      loginId: ['', [Validators.required, Validators.minLength(this.validation.loginId.minLength), Validators.maxLength(this.validation.loginId.maxLength)]],
      password: ['', [Validators.required, Validators.minLength(this.validation.password.minLength), Validators.maxLength(this.validation.password.maxLength)]],
    })
  }

  get f() {
    return this.signinForm.controls;
  }

  onSubmit() {
    console.log(this.signinForm.controls['loginId'].value);
    console.log(this.signinForm.controls['password'].value);
  }

}
