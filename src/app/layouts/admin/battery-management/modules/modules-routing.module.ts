import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModulesComponent } from './modules.component';
import { ModulesListComponent } from './modules-list/modules-list.component';
import { CreateModuleComponent } from './create-module/create-module.component';
import { ModuleGuard } from '../guards/module.guard';


const routes: Routes = [
  {
    path: '', component: ModulesComponent, children: [
      { path: '', redirectTo: 'modules-list' },
      { path: 'modules-list', component: ModulesListComponent },
      { path: 'create-module', component: CreateModuleComponent, canActivate: [ModuleGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
