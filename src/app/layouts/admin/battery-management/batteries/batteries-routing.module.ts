import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatteriesComponent } from './batteries.component';
import { CreateBatteriesComponent } from './create-batteries/create-batteries.component';
import { BatteryListComponent } from './battery-list/battery-list.component';
import { BatteryGuard } from '../guards/battery.guard';


const routes: Routes = [
  {
    path: '', component: BatteriesComponent, children: [
      { path: '', redirectTo: 'battery-list' },
      { path: 'create-batteries', component: CreateBatteriesComponent, canActivate: [BatteryGuard] },
      { path: 'battery-list', component: BatteryListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatteriesRoutingModule { }
