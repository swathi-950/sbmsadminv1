import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationsService } from 'src/app/Services/validations/validations.service';
import { BatteryService } from 'src/app/Services/batteries/battery.service';
import { ToastrService } from 'ngx-toastr';
import { AssetCategory } from 'src/app/share/modal/modal';
import { AssetService } from 'src/app/Services/asset.service';

@Component({
  selector: 'app-edit-battery',
  templateUrl: './edit-battery.component.html',
  styleUrls: ['./edit-battery.component.css']
})
export class EditBatteryComponent implements OnInit {
  createBattery: FormGroup;
  validation;
  assetCatagoryList: AssetCategory[] = [];
  constructor(private validation_ser: ValidationsService,
    private fb: FormBuilder,
    private batteryService: BatteryService,
    private toastr: ToastrService,
    private assetService: AssetService) { }

  ngOnInit(): void {
    this.getAssetCatagoryList();
    this.getValidations();
    this.init_validations();
    this.sub_Edit_Battery();
  }

  getValidations() {
    this.validation = this.validation_ser.batteryCreation;
  }

  init_validations() {
    this.createBattery = this.fb.group({
      batteryId: ['', [Validators.required]],
      storageTemperature: new FormGroup({
        value: new FormControl('', [Validators.required]),
        units: new FormControl('degrees'),
      }),
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
      assetCategory: ['', [Validators.required, Validators.minLength(this.validation.assetCategory.minLength), Validators.maxLength(this.validation.assetCategory.maxLength)]],
    })
  }

  sub_Edit_Battery() {
    this.batteryService.copyEditBatteryList.subscribe(val => {
      this.createBattery.controls['batteryId'].setValue(val.batteryId);
      this.createBattery.controls['storageTemperature'].setValue(val.storageTemperature);
      this.createBattery.controls['ratedBatteryCapacity'].setValue(val.ratedBatteryCapacity);
      this.createBattery.controls['specifiedCharge'].setValue(val.specifiedCharge);
      this.createBattery.controls['dimensions'].setValue(val.dimensions);
      this.createBattery.controls['dischargeRate'].setValue(val.dischargeRate);
      this.createBattery.controls['nominalVoltage'].setValue(val.nominalVoltage);
      this.createBattery.controls['chargingPolicy'].setValue(val.chargingPolicy);
      this.createBattery.controls['operatingTemperature'].setValue(val.operatingTemperature);
      this.createBattery.controls['manufacturingDate'].setValue(val.manufacturingDate);
      this.createBattery.controls['warrantyPeriod'].setValue(val.warrantyPeriod);
      this.createBattery.controls['assetCategory'].setValue(val.assetCategory);

    })
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

  get f() {
    return this.createBattery.controls;
  }

  editBattery() {
    this.batteryService.editBattery(this.createBattery.value).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success("Battery updated successfully", 'Success');
        this.createBattery.reset();
        $(document).ready(function () {
          $(".close").click();
        });
        this.batteryService.getBatteries().subscribe();
      }, (err) => {
        console.log(err);
        this.toastr.error("Some thing went worng.", "Error");
      }
    )


  }

}
