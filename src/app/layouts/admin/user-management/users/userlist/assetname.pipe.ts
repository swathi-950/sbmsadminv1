import { Pipe, PipeTransform } from '@angular/core';
import { AssetService } from 'src/app/Services/asset.service';
import { AssetCategory } from 'src/app/share/modal/modal';

@Pipe({
  name: 'assetname'
})
export class AssetnamePipe implements PipeTransform {

  assetList: AssetCategory[] = [];

  constructor(private asset_ser: AssetService) {
    this.get_asset_list();
  }

  get_asset_list() {
    this.asset_ser.assetCategoryList.subscribe(val => {
      if (val.length != 0) {
        this.assetList = val;
        console.log(this.assetList);
      }
    })
  }

  transform(value: String) {
    if (value != null && this.assetList.length != 0) {
      for (let i = 0; i < this.assetList.length; i++) {
        if (value == this.assetList[i].assetCategoryId) {
          return this.assetList[i].categoryName;
        }
      }
    } else {
      return "not available";
    }
  }

}
