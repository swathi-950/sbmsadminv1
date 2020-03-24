import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetCategoryListComponent } from './asset-category-list/asset-category-list.component';
import { AddAssetCategoryComponent } from './add-asset-category/add-asset-category.component';
import { AssetcategoryComponent } from './assetcategory.component';


const routes: Routes = [
  {
    path: '', component: AssetcategoryComponent, children: [
      { path: '', redirectTo: 'asset-category-list' },
      { path: 'asset-category-list', component: AssetCategoryListComponent },
      { path: 'add-asset-category', component: AddAssetCategoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetcategoryRoutingModule { }
