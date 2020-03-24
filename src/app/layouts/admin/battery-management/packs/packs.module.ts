import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacksRoutingModule } from './packs-routing.module';
import { PacksComponent } from './packs.component';
import { CreatePacksComponent } from './create-packs/create-packs.component';
import { PacksListComponent } from './packs-list/packs-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPackComponent } from './edit-pack/edit-pack.component';


@NgModule({
  declarations: [PacksComponent, CreatePacksComponent, PacksListComponent, EditPackComponent],
  imports: [
    CommonModule,
    PacksRoutingModule,
    ReactiveFormsModule
  ]
})
export class PacksModule { }
