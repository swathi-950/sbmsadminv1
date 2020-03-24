import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './layouts/admin/admin.component';
import { AuthGaurdService } from './Services/auth-guard.service';


const routes: Routes = [
  { path: 'signIn', loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule) },
  {
    path: '', component: AdminComponent, /* canActivate: [AuthGaurdService], */
    children: [
      { path: '', loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
