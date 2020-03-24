import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AssetService } from 'src/app/Services/asset.service';
import { AssetCategory } from 'src/app/share/modal/modal';
import { AuthenticationService } from 'src/app/Services/authentication.service';
declare var $;


@Component({
  selector: 'app-asset-category-list',
  templateUrl: './asset-category-list.component.html',
  styleUrls: ['./asset-category-list.component.css']
})
export class AssetCategoryListComponent implements OnInit {

  assetCategoryList: AssetCategory[];
  copyDeleteItem: AssetCategory;
  enable_buttons: string[] = [];

  constructor(private assetService: AssetService,
    public auth: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCategoryList();
    this.subcribe();
    this.sub_auth_permission();
  }

  sub_auth_permission() {
    this.auth.permissions.subscribe(val => {
      if (val.length != 0) {
        this.enable_buttons = val;
      }
    })
  }

  subcribe() {
    this.assetService.assetCategoryList.subscribe(res => {
      this.assetCategoryList = res;
    });
  }

  getCategoryList() {
    this.assetService.getAssetCategoryList().subscribe(res => {
      this.assetCategoryList = this.assetService.assetCategoryList.value;
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

  Edit(item: AssetCategory) {
    this.assetService.copyEditAssertCategory.next(item);
  }

  copyDelete(item: AssetCategory) {
    this.copyDeleteItem = item;
  }

  deleteAssetCategory() {
    this.assetService.deleteAssetCategory(this.copyDeleteItem.assetCategoryId).subscribe(res => {
      this.toastr.success(`${this.copyDeleteItem.categoryName} deleted successfully`, "Success");
      $('.modal-Asset-category-del').modal('hide')
      this.getCategoryList();

    })
  }

}
