import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AssetcategoryRoutingModule } from './assetcategory-routing.module';
import { AssetcategoryComponent } from './assetcategory.component';
import { AddAssetCategoryComponent } from './add-asset-category/add-asset-category.component';
import { EditAssetCategoryComponent } from './edit-asset-category/edit-asset-category.component';
import { AssetCategoryListComponent } from './asset-category-list/asset-category-list.component';


@NgModule({
  declarations: [AssetcategoryComponent,
    AddAssetCategoryComponent,
    AssetCategoryListComponent,
    EditAssetCategoryComponent],
  imports: [
    CommonModule,
    AssetcategoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class AssetcategoryModule { }
