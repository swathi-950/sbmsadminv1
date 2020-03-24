import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetManagementComponent } from './asset-management.component';


const routes: Routes = [
  {
    path: '', component: AssetManagementComponent, children: [
      { path: '', redirectTo: 'assetcategory' },
      { path: 'assetcategory', loadChildren: () => import('./assetcategory/assetcategory.module').then(m => m.AssetcategoryModule) },
      { path: 'assetType', loadChildren: () => import('./asset-type/asset-type.module').then(m => m.AssetTypeModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetManagementRoutingModule { }
