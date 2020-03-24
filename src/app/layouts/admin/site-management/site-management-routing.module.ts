import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteManagementComponent } from './site-management.component';
import { AddSiteComponent } from './add-site/add-site.component';
import { SiteListComponent } from './site-list/site-list.component';
import { SiteArchitectureComponent } from './site-architecture/site-architecture.component';
import { SiteRequirementComponent } from './site-requirement/site-requirement.component';
import { CreateSiteGuard } from './guard/create-site.guard';


const routes: Routes = [
  {
    path: '', component: SiteManagementComponent, children: [
      { path: '', redirectTo: 'site-list' },
      { path: 'site-list', component: SiteListComponent },
      { path: 'add-site', component: AddSiteComponent, canActivate: [CreateSiteGuard] },
      { path: 'site-arc', component: SiteArchitectureComponent },
      { path: 'site-req', component: SiteRequirementComponent }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteManagementRoutingModule { }
