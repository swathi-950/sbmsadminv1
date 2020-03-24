import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { SiteService } from 'src/app/Services/site.service';
import { ValidationsService } from 'src/app/Services/validations/validations.service';

@Component({
  selector: 'app-site-requirement',
  templateUrl: './site-requirement.component.html',
  styleUrls: ['./site-requirement.component.css']
})

export class SiteRequirementComponent implements OnInit {

  siteReqForm: FormGroup
  loading = false;
  validations;

  constructor(private fb: FormBuilder,
    private site: SiteService,
    private toastr: ToastrService,
    private validate_ser: ValidationsService) {
    this.init_validations();
  }

  ngOnInit(): void {
    this.init_validations();
    this.siteReqValidations();
  }

  init_validations() {
    this.validations = this.validate_ser.Siterequirement;
  }

  siteReqValidations() {
    this.siteReqForm = this.fb.group({
      power: ['', [Validators.required, Validators.minLength(this.validations.power.minLength), Validators.maxLength(this.validations.power.maxLength)]],
      voltage: ['', [Validators.required, Validators.minLength(this.validations.voltage.minLength), Validators.maxLength(this.validations.voltage.maxLength)]],
    })
  }

  get f() {
    return this.siteReqForm.controls;
  }

  onSubmit() {
    this.loading = true;
    console.log(this.siteReqForm.value);
    this.site.siteReq(this.siteReqForm.value).subscribe(
      (res) => {
        console.log(res);
        this.loading = false
        this.toastr.success('SiteRequriment Created Successfully', 'Success');
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
