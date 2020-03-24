import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { SiteService } from 'src/app/Services/site.service';
import { Country, State, City, Sites } from 'src/app/share/modal/modal';
import { ValidationsService } from 'src/app/Services/validations/validations.service';

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.css']
})

export class EditSiteComponent implements OnInit {
  editSite: FormGroup;
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  selectedSite: Sites;
  validations;

  constructor(private fb: FormBuilder,
    private siteService: SiteService,
    private toastr: ToastrService,
    private validate_ser: ValidationsService) {
    this.init_validations();
  }

  ngOnInit(): void {
    this.init_validations();
    this.getCountries();
    this.init_Site();
    this.sub_edit_site();
  }

  init_validations() {
    this.validations = this.validate_ser.creastesite;
  }

  init_Site() {
    this.editSite = this.fb.group({
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      siteName: ['', [Validators.required, Validators.minLength(this.validations.siteName.minLength), Validators.maxLength(this.validations.siteName.maxLength)]],
      createdBy: [''],
      createdDate: [''],
      modifiedBy: [''],
      modifiedDate: [''],
      id: ['', [Validators.required]]
    })
  }

  sub_edit_site() {
    this.siteService.copy_site.subscribe(val => {
      this.editSite.controls['id'].setValue(val.id);
      this.editSite.controls['country'].setValue(val.country);
      this.editSite.controls['state'].setValue(val.state);
      this.editSite.controls['city'].setValue(val.city);
      this.editSite.controls['siteName'].setValue(val.siteName);
      this.editSite.controls['createdBy'].setValue(val.createdBy);
      this.editSite.controls['createdDate'].setValue(val.createdDate);
      this.editSite.controls['modifiedBy'].setValue(val.modifiedBy);
      this.editSite.controls['modifiedDate'].setValue(val.modifiedDate);
      this.selectedSite = val;
      console.log(this.selectedSite);
      this.init_country_state_city();
    });
  }

  init_country_state_city() {
    console.log("init_country_state_city -------- country", this.selectedSite.country);
    setTimeout(() => { this.Filter(this.selectedSite.country); }, 200)
    console.log("init_country_state_city -------- state", this.selectedSite.state);
    setTimeout(() => { this.selectedState(this.selectedSite.state); }, 400);
  }


  get f() {
    return this.editSite.controls;
  }

  getCountries() {
    this.siteService.getCountries().subscribe(
      (res) => {
        console.log(res);
        this.countries = res;
        this.states = [];
        this.cities = [];
      },
      (err) => {
        console.log(err);
      })
  }

  Filter(name) {
    console.log(name);
    let number = this.countries.filter(v => v.name == name);
    console.log(number);
    if (number.length !== 0) {
      this.getStates(number[0].country_id);
    }

  }

  getStates(country_id: number) {
    console.log(country_id);
    this.siteService.getStates(country_id).subscribe(
      (res) => {
        console.log(res);
        this.states = res;
        this.cities = [];
      },
      (err) => {
        console.log(err);
      })
  }

  selectedState(name) {
    console.log(name);
    let number = this.states.filter(v => v.name == name);
    console.log(number);
    if (number.length != 0) {
      this.getCities(+number[0].state_id);
    }
  }

  getCities(state_id: number) {
    console.log(state_id);
    this.siteService.getCities(state_id).subscribe(
      (res) => {
        console.log(res);
        this.cities = res;
      },
      (err) => {
        console.log(err);
      })
  }

  EditSite() {
    console.log(this.editSite.value);
    console.log(this.editSite.controls['id'].value);
    if (this.editSite.invalid) {
      this.toastr.error("Please fill all fields.", "Error");
      return
    }
    this.siteService.updateSite(this.editSite.value, this.editSite.controls['id'].value).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('Site Updated Successfully', 'Success');
        $(document).ready(function () {
          $(".close").click();
        });
      }, (err) => {
        console.log(err);
        this.toastr.error(err.error.errorMessage, "Error");
      })
  }


}
