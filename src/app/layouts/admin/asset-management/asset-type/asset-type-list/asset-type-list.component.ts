import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AssertType } from 'src/app/share/modal/modal';
import { AssetService } from 'src/app/Services/asset.service';
declare var $;

@Component({
  selector: 'app-asset-type-list',
  templateUrl: './asset-type-list.component.html',
  styleUrls: ['./asset-type-list.component.css']
})

export class AssetTypeListComponent implements OnInit {
  
  assetTypeList: AssertType[];
  copyAssetType: AssertType; //edit or delete asset

  constructor(private assetService: AssetService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAssetTypeList();
    this.subAssetTypeListFromService();
  }

  getAssetTypeList() {
    this.assetService.getAssetTypeList().subscribe(res => {
      console.log(res);
      if (res != null) {
        this.assetTypeList = res;
        console.log(this.assetTypeList);
      } else {
        this.assetTypeList = [];
      }
    });
    this.assetTypeList = this.assetService.assetTypeList.value;
  }

  subAssetTypeListFromService() {
    this.assetService.assetTypeList.subscribe(val => {
      if (val.length != 0) {
        this.assetTypeList = val;
      } else {
        this.assetTypeList = [];
      }
    });
    console.log(this.assetTypeList);
  }

  edit(asset: AssertType) {
    this.assetService.copyEditAssertType.next(asset);
  }

  delete(asset) {
    this.copyAssetType = asset;
  }

  deleteAssetType() {
    this.assetService.deleteAssetType(this.copyAssetType.assetTypeId).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(`${this.copyAssetType.assetType} deleted successfully`, "Success");
        $('#deleteAssetTypeModal').modal('hide');
        this.getAssetTypeList();
      }
    )
  }

}
