import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteManagementRoutingModule } from './site-management-routing.module';
import { SiteManagementComponent } from './site-management.component';
import { AddSiteComponent } from './add-site/add-site.component';
import { SiteListComponent } from './site-list/site-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditSiteComponent } from './edit-site/edit-site.component';
import { SiteArchitectureComponent } from './site-architecture/site-architecture.component';
import { SiteRequirementComponent } from './site-requirement/site-requirement.component';
import { NumbersOnlyModule } from 'src/app/share/modules/numbers-only.module';

@NgModule({
  declarations: [SiteManagementComponent,
    AddSiteComponent,
    SiteListComponent,
    EditSiteComponent,
    SiteArchitectureComponent,
    SiteRequirementComponent],
  imports: [
    CommonModule,
    SiteManagementRoutingModule,
    ReactiveFormsModule,
    NumbersOnlyModule
  ]
})
export class SiteManagementModule { }
