import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { ValidationsService } from 'src/app/Services/validations/validations.service';
import { AssetService } from 'src/app/Services/asset.service';

@Component({
  selector: 'app-create-assettype',
  templateUrl: './create-assettype.component.html',
  styleUrls: ['./create-assettype.component.css']
})

export class CreateAssettypeComponent implements OnInit {

  addAssetType: FormGroup;
  validations;
  loading: boolean;

  constructor(private validate_ser: ValidationsService,
    private fb: FormBuilder,
    private assetService: AssetService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.init_validations();
    this.init_form();
  }

  get f() {
    return this.addAssetType.controls;
  }

  init_validations() {
    this.validations = this.validate_ser.CreateassetType;
  }

  init_form() {
    this.addAssetType = this.fb.group({
      assetType: ['', [Validators.required, Validators.minLength(this.validations.assetType.minLength), Validators.maxLength(this.validations.assetType.maxLength)]],
      description: ['', [Validators.required, Validators.minLength(this.validations.description.minLength), Validators.maxLength(this.validations.description.maxLength)]],
      assetCategoryName: ['', [Validators.required, Validators.minLength(this.validations.assetCategoryName.minLength), Validators.maxLength(this.validations.assetCategoryName.maxLength)]]
    })
  }

  createAssetType() {
    this.loading = true;
    console.log(this.addAssetType.value);
    if (this.addAssetType.invalid) {
      this.toastr.warning("Please fill all fields", "Warning");
      return
    }
    this.assetService.createAssetType(this.addAssetType.value).subscribe(res => {
      console.log(res);
      this.loading = false;
      this.toastr.success("Asset type created successfully", "Success");
      this.router.navigate(['asset-management/assetType/asset-type-list'])

    }, (err) => {
      console.log(err);
      this.toastr.error(err.error.errorMessage, "Error");
    }

    )


  }

}
