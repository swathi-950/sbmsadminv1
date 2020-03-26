import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserlistComponent } from './userlist/userlist.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { UserGuard } from '../guard/user.guard';

const routes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      { path: '', redirectTo: 'users-list' },
      { path: 'users-list', component: UserlistComponent },
      { path: 'create-users', component: CreateUsersComponent, canActivate: [UserGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule { }
