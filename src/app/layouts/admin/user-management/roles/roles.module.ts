import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { CreateRolesComponent } from './create-roles/create-roles.component';
import { EditRolesComponent } from './edit-roles/edit-roles.component';


@NgModule({
  declarations: [RolesComponent,
    RolesListComponent,
    CreateRolesComponent,
    EditRolesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RolesRoutingModule
  ]
})

export class RolesModule { }
