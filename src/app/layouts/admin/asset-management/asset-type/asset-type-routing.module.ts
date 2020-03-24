import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetTypeComponent } from './asset-type.component';
import { AssetTypeListComponent } from './asset-type-list/asset-type-list.component';
import { CreateAssettypeComponent } from './create-assettype/create-assettype.component';


const routes: Routes = [
  {
    path: '', component: AssetTypeComponent, children: [
      { path: '', redirectTo: 'asset-type-list' },
      { path: 'asset-type-list', component: AssetTypeListComponent },
      { path: 'add-asset-type', component: CreateAssettypeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetTypeRoutingModule { }
