import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetService } from 'src/app/Services/asset.service';
import { ToastrService } from 'ngx-toastr';

import { ValidationsService } from 'src/app/Services/validations/validations.service';

@Component({
  selector: 'app-edit-asset-type',
  templateUrl: './edit-asset-type.component.html',
  styleUrls: ['./edit-asset-type.component.css']
})
export class EditAssetTypeComponent implements OnInit {
  updateAssetType: FormGroup;
  validations;

  constructor(private fb: FormBuilder,
    private validate_ser: ValidationsService,
    private assetService: AssetService,
    private toastr: ToastrService) {
    this.init_validations();
  }

  ngOnInit(): void {
    this.init_validations();
    this.init_Asset_type();
    this.sub_edit_asset_type();
  }

  init_validations() {
    this.validations = this.validate_ser.CreateassetType;
  }

  init_Asset_type() {
    this.updateAssetType = this.fb.group({
      assetType: ['', [Validators.required, Validators.minLength(this.validations.assetType.minLength), Validators.maxLength(this.validations.assetType.maxLength)]],
      description: ['', [Validators.required, Validators.minLength(this.validations.description.minLength), Validators.maxLength(this.validations.description.maxLength)]],
      assetCategoryName: ['', [Validators.required, Validators.minLength(this.validations.assetCategoryName.minLength), Validators.maxLength(this.validations.assetCategoryName.maxLength)]],
      assetTypeId: ['', Validators.required],
      createdUser: [''],
      createdDate: [''],
      modifiedUser: [''],
      modifiedDate: ['']
    });
  }

  sub_edit_asset_type() {
    this.assetService.copyEditAssertType.subscribe(val => {
      this.updateAssetType.controls['assetType'].setValue(val.assetType);
      this.updateAssetType.controls['description'].setValue(val.description);
      this.updateAssetType.controls['assetCategoryName'].setValue(val.assetCategoryName);
      this.updateAssetType.controls['assetTypeId'].setValue(val.assetTypeId);
      this.updateAssetType.controls['createdUser'].setValue(val.createdUser);
      this.updateAssetType.controls['createdDate'].setValue(val.createdDate);
      this.updateAssetType.controls['modifiedUser'].setValue(val.modifiedUser);
      this.updateAssetType.controls['modifiedDate'].setValue(val.modifiedDate);
    });
  }

  get f() {
    return this.updateAssetType.controls;
  }

  editAssetType() {
    this.assetService.editAssetType(this.updateAssetType.value).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('Asset type updated successfully', "Success");
        this.updateAssetType.reset();
        $(document).ready(function () {
          $(".close").click();
        });
        this.assetService.getAssetTypeList().subscribe();
      }, (err) => {
        console.log(err);
        this.toastr.error(err.error.errorMessage, "Error");
      })
  }
}
