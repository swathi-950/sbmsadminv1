import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetTypeRoutingModule } from './asset-type-routing.module';
import { AssetTypeComponent } from './asset-type.component';
import { AssetTypeListComponent } from './asset-type-list/asset-type-list.component';
import { CreateAssettypeComponent } from './create-assettype/create-assettype.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditAssetTypeComponent } from './edit-asset-type/edit-asset-type.component';


@NgModule({
  declarations: [AssetTypeComponent,
    AssetTypeListComponent,
    CreateAssettypeComponent,
    EditAssetTypeComponent],
  imports: [
    CommonModule,
    AssetTypeRoutingModule,
    ReactiveFormsModule
  ]
})
export class AssetTypeModule { }
