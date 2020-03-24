import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AssetService } from 'src/app/Services/asset.service';
import { ValidationsService } from 'src/app/Services/validations/validations.service';

@Component({
  selector: 'app-add-asset-category',
  templateUrl: './add-asset-category.component.html',
  styleUrls: ['./add-asset-category.component.css']
})
export class AddAssetCategoryComponent implements OnInit {

  loading: boolean;
  validations;
  addAssetCategory: FormGroup

  constructor(private fb: FormBuilder,
    private assetService: AssetService,
    private toastr: ToastrService,
    private router: Router,
    private validate_ser: ValidationsService) { }

  ngOnInit(): void {
    this.init_validations();
    this.init_form();
  }

  get f() {
    return this.addAssetCategory.controls;
  }

  init_validations() {
    this.validations = this.validate_ser.assetCategory;
  }

  init_form() {
    this.addAssetCategory = this.fb.group({
      categoryName: ['', [Validators.required, Validators.minLength(this.validations.categoryName.minLength), Validators.maxLength(this.validations.categoryName.maxLength)]],
      description: ['', [Validators.required, Validators.minLength(this.validations.description.minLength), Validators.maxLength(this.validations.description.maxLength)]],
    });
  }

  createAssetCategory() {
    console.log(this.addAssetCategory.value);
    if (this.addAssetCategory.invalid) {
      this.toastr.warning("Please fill all fields.", "Warning");
      return
    }
    this.assetService.createAssetCategory(this.addAssetCategory.value).subscribe(res => {
      console.log(res);
      this.toastr.success("Create asset successfully", "Success");
      this.addAssetCategory.reset();
      this.router.navigate(['/assert-management/category-List']);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.errorMessage, "Error");
    });
  }

}
