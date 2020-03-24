import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatteryManagementRoutingModule } from './battery-management-routing.module';
import { BatteryManagementComponent } from './battery-management.component';


@NgModule({
  declarations: [BatteryManagementComponent],
  imports: [
    CommonModule,
    BatteryManagementRoutingModule
  ]
})
export class BatteryManagementModule { }
