import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacksComponent } from './packs.component';
import { CreatePacksComponent } from './create-packs/create-packs.component';
import { PacksListComponent } from './packs-list/packs-list.component';
import { PackGuard } from '../guards/pack.guard';


const routes: Routes = [
  {
    path: '', component: PacksComponent, children: [
      { path: '', redirectTo: 'packs-list' },
      { path: 'packs-list', component: PacksListComponent },
      { path: 'create-pack', component: CreatePacksComponent, canActivate: [PackGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacksRoutingModule { }
