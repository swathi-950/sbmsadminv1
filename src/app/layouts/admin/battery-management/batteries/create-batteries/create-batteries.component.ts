import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { ValidationsService } from 'src/app/Services/validations/validations.service';
import { BatteryService } from 'src/app/Services/batteries/battery.service';
import { AssetCategory } from 'src/app/share/modal/modal';
import { AssetService } from 'src/app/Services/asset.service';

@Component({
  selector: 'app-create-batteries',
  templateUrl: './create-batteries.component.html',
  styleUrls: ['./create-batteries.component.css']
})
export class CreateBatteriesComponent implements OnInit {

  validation;
  spin = false;
  createBattery: FormGroup;
  assetCatagoryList: AssetCategory[] = []

  constructor(private validation_ser: ValidationsService,
    private fb: FormBuilder,
    private batteryService: BatteryService,
    private toastr: ToastrService,
    private router: Router,
    private assetService: AssetService) {
    this.getValidations();
  }

  ngOnInit(): void {
    this.getAssetCatagoryList();
    this.init_validations();
  }

  getValidations() {
    this.validation = this.validation_ser.batteryCreation;
  }

  init_validations() {
    this.createBattery = this.fb.group({
      storageTemperature: new FormGroup({
        value: new FormControl('', [Validators.required]),
        units: new FormControl('degrees'),
      }),
      /*   storageTemperature: this.fb.group({
          value: ['', Validators.required],
          units: ['degrees']
        }), */
      ratedBatteryCapacity: new FormGroup({
        value: new FormControl('', [Validators.required]),
        units: new FormControl('AH'),
      }),
      specifiedCharge: new FormGroup({
        value: new FormControl('', [Validators.required]),
        units: new FormControl('percentage'),
      }),
      dimensions: ['', [Validators.required, Validators.minLength(this.validation.dimensions.minLength), Validators.maxLength(this.validation.dimensions.maxLength)]],
      dischargeRate: ['', [Validators.required, Validators.minLength(this.validation.dischargeRate.minLength), Validators.maxLength(this.validation.dischargeRate.maxLength)]],
      nominalVoltage: new FormGroup({
        value: new FormControl('', [Validators.required]),
        units: new FormControl('volts'),
      }),
      chargingPolicy: ['', [Validators.required, Validators.minLength(this.validation.chargingPolicy.minLength), Validators.maxLength(this.validation.chargingPolicy.maxLength)]],
      operatingTemperature: new FormGroup({
        value: new FormControl('', [Validators.required]),
        units: new FormControl('degrees'),
      }),
      manufacturingDate: ['', [Validators.required]],
      warrantyPeriod: ['', [Validators.required, Validators.minLength(this.validation.warrantyPeriod.minLength), Validators.maxLength(this.validation.warrantyPeriod.maxLength)]],
      assetCategory: ['BMS', [Validators.required, Validators.minLength(this.validation.assetCategory.minLength), Validators.maxLength(this.validation.assetCategory.maxLength)]],
    });
    const asset = this.createBattery.get('assetCategory');
    asset.disable();
  }

  get f() {
    return this.createBattery.controls;
  }

  getAssetCatagoryList() {
    this.assetService.getAssetCategoryList().subscribe(
      (res) => {
        console.log("asset list", res);
        this.assetCatagoryList = res;
      }, (err) => {
        console.log(err);
      }
    )
  }
  
  onSubmit() {
    console.log(this.createBattery.get('assetCategory').enable());
    /* if (this.createBattery.invalid) {
      this.spin = false;
      this.toastr.warning('Please fill all fields.');
      return
    } */
    this.spin = true;
    /* const manufacturingDate: string = new Date(this.createBattery.value.manufacturingDate).toISOString();
    console.log(manufacturingDate);
    this.createBattery.value.manufacturingDate = manufacturingDate; */
    console.clear();
    console.log(this.createBattery.value);
    console.log(this.createBattery.get('assetCategory').status);
    
    return;
    this.batteryService.batteryCreation(this.createBattery.value).subscribe(
      (res) => {
        console.log(res);
        this.spin = false;
        this.toastr.success("Battery created successfully", 'Success');
        this.router.navigate(['./battery-management/batteries/battery-list']);

      }, (err) => {
        console.log(err);
      }
    )
  }
}