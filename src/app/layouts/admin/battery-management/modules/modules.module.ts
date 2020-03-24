import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { CreateModuleComponent } from './create-module/create-module.component';
import { ModulesListComponent } from './modules-list/modules-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditModuleComponent } from './edit-module/edit-module.component';
import { NumbersOnlyModule } from 'src/app/share/modules/numbers-only.module';


@NgModule({
  declarations: [ModulesComponent, CreateModuleComponent, ModulesListComponent, EditModuleComponent],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    ReactiveFormsModule,
    NumbersOnlyModule
  ]
})
export class ModulesModule { }
