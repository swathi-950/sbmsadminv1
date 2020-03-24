import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { CreatePermissionsComponent } from './create-permissions/create-permissions.component';
import { PermissionsListComponent } from './permissions-list/permissions-list.component';
import { PermissionsComponent } from './permissions.component';
import { EditPermissionsComponent } from './edit-permissions/edit-permissions.component';


@NgModule({
  declarations: [CreatePermissionsComponent,
    PermissionsListComponent,
    PermissionsComponent,
    EditPermissionsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PermissionsRoutingModule
  ]
})

export class PermissionsModule { }
