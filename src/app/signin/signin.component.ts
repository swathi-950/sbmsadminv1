import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../Services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationsService } from '../Services/validations/validations.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup

  username: string = null;
  password: string = null;
  pwd: string = null;
  errBoolean = false;
  loading = false;
  validations = false;
  reloadonce: string = null;
  validation;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private validation_ser: ValidationsService) { }

  ngOnInit() {
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
    this.loading = !this.loading;
    this.password = this.pwd;
    this.authenticationService.authenticate(this.signinForm.controls['loginId'].value, this.signinForm.controls['password'].value)
      .subscribe(
        () => {
          this.loading = !this.loading;
          this.router.navigate(['/']).then(() => {
            this.toastr.success('Login successful', 'Success');
          });
        },
        error => {
          this.loading = !this.loading;
          this.pwd = null;
          console.log(error);
          if (error.status === 404) {
            this.toastr.error('Incorrect username or password', 'Error');
          } else if (error.status > 500) {
            this.toastr.error("Internal server error please try again after sometime", 'Error');
          } else if (error.status === 0) {
            this.toastr.error("Server is not responding", 'Error');
          } else if (error.status === 500) {
            this.toastr.error(error.error.errorMessage, 'Error');
          }
        });
  }

}
