import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatteriesRoutingModule } from './batteries-routing.module';
import { BatteriesComponent } from './batteries.component';
import { CreateBatteriesComponent } from './create-batteries/create-batteries.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BatteryListComponent } from './battery-list/battery-list.component';
import { EditBatteryComponent } from './edit-battery/edit-battery.component';
import { NumbersOnlyModule } from 'src/app/share/modules/numbers-only.module';


@NgModule({
  declarations: [BatteriesComponent, CreateBatteriesComponent, BatteryListComponent, EditBatteryComponent],
  imports: [
    CommonModule,
    BatteriesRoutingModule,
    ReactiveFormsModule,
    NumbersOnlyModule
  ]
})
export class BatteriesModule { }
