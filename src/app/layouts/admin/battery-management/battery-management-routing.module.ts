import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatteryManagementComponent } from './battery-management.component';


const routes: Routes = [
  {
    path: '', component: BatteryManagementComponent, children: [
      { path: '', redirectTo: 'batteries' },
      { path: 'batteries', loadChildren: () => import('./batteries/batteries.module').then(m => m.BatteriesModule) },
      { path: 'packs', loadChildren: () => import('./packs/packs.module').then(m => m.PacksModule) },
      { path: 'modules', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule) }

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatteryManagementRoutingModule { }
