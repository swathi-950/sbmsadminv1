import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { RoleService } from 'src/app/Services/roles/role.service';
import { permissionsList } from 'src/app/share/modal/modal';
import { AuthenticationService } from 'src/app/Services/authentication.service';
declare var $;

@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.css']
})

export class PermissionsListComponent implements OnInit {

  permissionsList: permissionsList[] = [];
  copyPermission: permissionsList;

  enable_buttons: string[] = [];

  constructor(private roleService: RoleService,
    private toastr: ToastrService,
    private auth: AuthenticationService) {
    this.subscribePermissionsList();
  }

  ngOnInit(): void {
    this.getPermisiionsList();
    this.sub_auth_permission();
  }

  ngOnDestroy(): void {
    this.copyPermission = null;
  }

  getPermisiionsList() {
    this.roleService.getPermissions().subscribe(res => {
      console.log(res);
      console.log("res per", res);
      if (res != null) {
        this.permissionsList = res;
      } else {
        this.permissionsList = []
      }
    });
    this.permissionsList = this.roleService.permissionList.value;
  }

  copyPermissionFromTable(per) {
    this.copyPermission = per;
    this.roleService.edit_Permission_Value.next(per);
  }

  deletePermission() {
    this.roleService.deletePermissions(this.copyPermission.id).subscribe(() => {
      $('#deletePermissionModal').modal('hide');
      this.toastr.success(`${this.copyPermission.name} deleted successfully`, "Success");
    }, err => {
      this.toastr.error(err.error.errorMessage, "Error");
    });
  }

  subscribePermissionsList() {
    this.roleService.permissionList.subscribe(val => {
      if (val.length != 0) {
        this.permissionsList = val;
      } else {
        this.permissionsList = [];
      }
    });
    console.log(this.permissionsList);
  }

  sub_auth_permission() {
    this.auth.permissions.subscribe(val => {
      if (val.length != 0) {
        this.enable_buttons = val;
      }
    })
  }

}
