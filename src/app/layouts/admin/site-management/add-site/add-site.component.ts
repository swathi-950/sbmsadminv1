import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Country, State, City } from 'src/app/share/modal/modal';
import { SiteService } from 'src/app/Services/site.service';
import { ValidationsService } from 'src/app/Services/validations/validations.service';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css']
})

export class AddSiteComponent implements OnInit {

  siteForm: FormGroup;
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  extensionNumber = '';
  extensionNo: any;
  id: any;
  loading = false;
  validations;

  constructor(private fb: FormBuilder,
    private site: SiteService,
    private toastr: ToastrService,
    private router: Router,
    private validate_ser: ValidationsService) {
    this.init_validations();
  }

  ngOnInit(): void {
    this.init_validations();
    this.siteValidations();
    this.getCountries();
  }

  init_validations() {
    this.validations = this.validate_ser.creastesite;
  }

  siteValidations() {
    this.siteForm = this.fb.group({
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      siteName: ['', [Validators.required, Validators.minLength(this.validations.siteName.minLength), Validators.maxLength(this.validations.siteName.maxLength)]],
      createdBy: [''],
      createdDate: [''],
      modifiedBy: [''],
      modifiedDate: ['']
    })
  }

  get f() {
    return this.siteForm.controls;
  }

  getCountries() {
    this.site.getCountries().subscribe(
      (res) => {
        console.log(res);
        this.countries = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  Filter(name) {
    console.log(name);
    let number = this.countries.filter(v => v.name == name);
    console.log(number);
    if (number.length !== 0) {
      this.getStates(number[0].country_id);

    } else {
      this.toastr.warning('Please select country', 'Warning');
    }
  }

  getStates(country_id: number) {
    console.log(country_id);
    this.site.getStates(country_id).subscribe(
      (res) => {
        console.log(res);
        this.states = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  selectedState(name) {
    console.log(name);
    let number = this.states.filter(v => v.name == name);
    console.log(number);
    if (number.length != 0) {
      this.getCities(+number[0].state_id);
    } else {
      this.toastr.warning('Please select state', 'Warning');
    }
  }

  getCities(state_id: number) {
    console.log(state_id);
    this.site.getCities(state_id).subscribe(
      (res) => {
        console.log(res);
        this.cities = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onSubmit() {
    this.loading = true;
    console.log(this.siteForm.value);
    if (this.siteForm.invalid) {
      return
    }
    this.site.siteCreate(this.siteForm.value).subscribe(
      (res) => {
        console.log(res);
        this.loading = false;
        this.toastr.success('Site Created Successfully', 'Success');
        this.router.navigate(['/site-management/site-list'])
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
