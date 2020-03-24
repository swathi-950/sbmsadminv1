import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from './mustMatch';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  alreadyExistEmail: boolean = false;
  emailexistError = '';

  spin = false;
  ErrMsg = '';

  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16), Validators.pattern('^[a-zA-z]+([\s][a-zA-Z]+)*$')]],
    designation: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16), Validators.pattern('^[a-zA-z]+([\s][a-zA-Z]+)*$')]],
    email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40), Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
    phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    dob: ['', [Validators.required]]
  }, {
    validator: MustMatch('password', 'confirmPassword')
  }
  );

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  get f() {
    return this.signupForm.controls;
  }

  isEmailExisted() {
    // if (this.signupForm.controls['email'].value > 6) {
    //   this.sam.isEmail(this.signupForm.controls['email'].value).subscribe(
    //     () => {
    //       this.emailexistError = '';
    //       this.alreadyExistEmail = false;
    //       return false
    //     }, (err) => {
    //       if (err.status == 501) {
    //         this.emailexistError = err.error.message;
    //         this.alreadyExistEmail = true;
    //         return true;
    //       }
    //     }
    //   )
    // }

  }
  signup() {
    this.spin = true;
    // this.sam.Security(this.signupForm.value).subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.router.navigate(['/signIn'])
    //   },
    //   (err) => {
    //     this.spin = false;
    //     console.log(err);
    //     this.toastr.success(err.message, "Error");
    //   }
    // )
  }
}
