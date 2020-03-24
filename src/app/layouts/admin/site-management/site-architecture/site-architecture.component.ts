import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ValidationsService } from 'src/app/Services/validations/validations.service';

import { SiteService } from 'src/app/Services/site.service';

@Component({
  selector: 'app-site-architecture',
  templateUrl: './site-architecture.component.html',
  styleUrls: ['./site-architecture.component.css']
})

export class SiteArchitectureComponent implements OnInit {

  siteArcForm: FormGroup;
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
    this.siteArcValidations();
  }


  init_validations() {
    this.validations = this.validate_ser.siteArchitecture;
  }

  siteArcValidations() {
    this.siteArcForm = this.fb.group({
      noOfModules: ['', [Validators.required, Validators.minLength(this.validations.noOfModules.minLength), Validators.maxLength(this.validations.noOfModules.maxLength)]],
      noOfPacks: ['', [Validators.required, Validators.minLength(this.validations.noOfPacks.minLength), Validators.maxLength(this.validations.noOfPacks.maxLength)]],
    })
  }

  get f() {
    return this.siteArcForm.controls;
  }

  onSubmit() {
    this.loading = true;
    console.log(this.siteArcForm.value);
    this.site.createSiteArc(this.siteArcForm.value).subscribe(
      (res) => {
        console.log(res);
        this.loading = false
        this.toastr.success('Site Architecture Created Successfully', 'Success');
      },
      (err) => {
        console.log(err);
      }
    )
  }


}
