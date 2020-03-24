import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AssetService } from 'src/app/Services/asset.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationsService } from 'src/app/Services/validations/validations.service';


@Component({
  selector: 'app-edit-asset-category',
  templateUrl: './edit-asset-category.component.html',
  styleUrls: ['./edit-asset-category.component.css']
})
export class EditAssetCategoryComponent implements OnInit {

  validations;
  addAssetCategory: FormGroup

  constructor(private fb: FormBuilder,
    private assetService: AssetService,
    private toastr: ToastrService,
    private validate_ser: ValidationsService) { }


  ngOnInit(): void {
    this.init_validations();
    this.init_form();
    this.assetService.copyEditAssertCategory.subscribe(result => {
      this.addAssetCategory.controls['categoryName'].setValue(result.categoryName);
      this.addAssetCategory.controls['description'].setValue(result.description);
      this.addAssetCategory.controls['assetCategoryId'].setValue(result.assetCategoryId);
    })
  }


  init_validations() {
    this.validations = this.validate_ser.assetCategory;
  }

  init_form() {
    this.addAssetCategory = this.fb.group({
      assetCategoryId: ['', [Validators.required]],
      categoryName: ['', [Validators.required, Validators.minLength(this.validations.categoryName.minLength), Validators.maxLength(this.validations.categoryName.maxLength)]],
      description: ['', [Validators.required, Validators.minLength(this.validations.description.minLength), Validators.maxLength(this.validations.description.maxLength)]],
    });
  }

  get f() {
    return this.addAssetCategory.controls;
  }

  editAssetCategory() {
    console.log(this.addAssetCategory.value);
    if (this.addAssetCategory.invalid) {
      this.toastr.warning("Please fill all fields.", "Warning");
      return
    }
    this.assetService.editAssetCategory(this.addAssetCategory.value).subscribe(res => {
      console.log(res);
      this.toastr.success("Update asset category successfully", "Success");
      this.addAssetCategory.reset();
      $(document).ready(function () {
        $(".close").click();
      });
      this.assetService.getAssetCategoryList().subscribe();
    }, err => {
      console.log(err);
      this.toastr.error(err.error.errorMessage, "Error");
    });
  }


}
