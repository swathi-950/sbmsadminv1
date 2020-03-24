import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserlistComponent } from './userlist/userlist.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NumbersOnlyModule } from 'src/app/share/modules/numbers-only.module';
import { AssetnamePipe } from './userlist/assetname.pipe';

@NgModule({
  declarations: [UsersComponent,
    UserlistComponent,
    CreateUsersComponent,
    EditUserComponent,
    AssetnamePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    NumbersOnlyModule
  ]
})

export class UsersModule { }
