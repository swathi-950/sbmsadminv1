import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { RoleService } from 'src/app/Services/roles/role.service';
import { permissionsList } from 'src/app/share/modal/modal';
import { ValidationsService } from 'src/app/Services/validations/validations.service';
declare var $;

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css']
})

export class EditRolesComponent implements OnInit {

  edit_Role: FormGroup;
  permissionsList: permissionsList[] = [];
  loading: boolean;
  edit_role_permissions = [];
  validations;
  readPermissions: permissionsList[] = [];
  writePermissions: permissionsList[] = [];

  constructor(private fb: FormBuilder,
    private roleService: RoleService,
    private toastr: ToastrService,
    private validate_ser: ValidationsService) {
    this.init_validations();
  }

  ngOnInit(): void {
    this.init_validations();
    this.init_role();
    this.getPermissionsWith_Read_wirte();
    this.sub_copy_role();
  }

  init_validations() {
    this.validations = this.validate_ser.roles;
  }

  init_role() {
    this.edit_Role = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(this.validations.name.minLength), Validators.maxLength(this.validations.name.maxLength)]],
      description: ['', [Validators.required, Validators.minLength(this.validations.description.minLength), Validators.maxLength(this.validations.description.maxLength)]],
      permissionsId: this.fb.array([]),
      createdBy: [''],
      createdDate: [''],
      modifiedBy: [''],
      modifiedDate: [''],
      roleId: [''],
      aliasName: [''],
      id: [''],
      readPermissions: this.fb.array([]),
      writePermissions: this.fb.array([])
    })
  }

  getPermissionsWith_Read_wirte() {
    this.roleService.getPermissionsWith_Read_wirte().subscribe();
    this.roleService.permissionList_read_write.subscribe(val => {
      if (val != null) {
        this.readPermissions = val.READ;
        this.writePermissions = val.WRITE;
        this.init_read_permissions();
        this.init_write_permissions();
      }
    })
  }

  sub_copy_role() {
    this.roleService.copy_role.subscribe(val => {
      if (val) {
        this.edit_Role.controls['name'].setValue(val.name);
        this.edit_Role.controls['createdBy'].patchValue(val.createdBy);
        this.edit_Role.controls['createdDate'].patchValue(val.createdDate);
        this.edit_Role.controls['description'].patchValue(val.description);
        this.edit_Role.controls['modifiedBy'].patchValue(val.modifiedBy);
        this.edit_Role.controls['modifiedDate'].patchValue(val.modifiedDate);
        this.edit_Role.controls['aliasName'].patchValue(val.aliasName);
        this.edit_Role.controls['roleId'].patchValue(val.roleId);
        this.edit_Role.controls['id'].patchValue(val.id);
        this.edit_role_permissions = val.permissionsId;
        setTimeout(() => {
          this.update_chexkBox();
        }, 200);
      }
    })
  }

  init_read_permissions() {
    const read_Permissions: FormArray = this.edit_Role.get('readPermissions') as FormArray;
    read_Permissions.controls = [];
    this.readPermissions.forEach((val, i) => {
      read_Permissions.push(new FormControl({
        'checked': false,
        'name': this.readPermissions[i].name,
        'permissionId': this.readPermissions[i].permissionId,
        'id': this.readPermissions[i].id
      }))
    });
  }

  init_write_permissions() {
    const write_Permissions: FormArray = this.edit_Role.get('writePermissions') as FormArray;
    write_Permissions.controls = [];
    this.writePermissions.forEach((val, i) => {
      write_Permissions.push(new FormControl({
        'checked': false,
        'name': this.writePermissions[i].name,
        'permissionId': this.writePermissions[i].permissionId,
        'id': this.writePermissions[i].id
      }))
    })
  }

  update_chexkBox() {
    this.reset_checkBox();
    this.update_read_checkBox();
    this.update_write_checkBox();
  }

  reset_checkBox() {
    const read_permissions = this.edit_Role.get('readPermissions') as FormArray;
    const write_permissions = this.edit_Role.get('writePermissions') as FormArray;
    for (let i = 0; i < this.readPermissions.length; i++) {
      read_permissions.value[i]['checked'] = false;
    }
    for (let i = 0; i < this.writePermissions.length; i++) {
      write_permissions.value[i]['checked'] = false;
    }
  }

  update_read_checkBox() {
    const read_permissions = this.edit_Role.get('readPermissions') as FormArray;
    read_permissions.controls = [];
    for (let i = 0; i < this.readPermissions.length; i++) {
      for (let j = 0; j < this.edit_role_permissions.length; j++) {
        if (this.readPermissions[i].permissionId == this.edit_role_permissions[j]) {
          read_permissions.value[i]['checked'] = true;
        }
      }
    }
  }

  update_write_checkBox() {
    const write_permissions = this.edit_Role.get('writePermissions') as FormArray;
    write_permissions.controls = [];
    for (let i = 0; i < this.writePermissions.length; i++) {
      for (let j = 0; j < this.edit_role_permissions.length; j++) {
        if (this.writePermissions[i].permissionId == this.edit_role_permissions[j]) {
          write_permissions.value[i]['checked'] = true;
        }
      }
    }
  }

  onCheckboxChangeRead(event, index) {
    const permissions: FormArray = this.edit_Role.get('readPermissions') as FormArray;
    if (event.target.checked) {
      permissions.value[index]['checked'] = true;
    } else {
      permissions.value[index]['checked'] = false;
    }
  }

  onCheckboxChangeWrite(event, index) {
    const permissions: FormArray = this.edit_Role.get('writePermissions') as FormArray;
    if (event.target.checked) {
      permissions.value[index]['checked'] = true;
    } else {
      permissions.value[index]['checked'] = false;
    }
  }

  loadingFalse() {
    this.loading = false;
  }

  get f() {
    return this.edit_Role.controls;
  }

  push_permissionId() {
    const permissionsId: FormArray = this.edit_Role.get('permissionsId') as FormArray;
    permissionsId.controls = [];
    const write_Permissions: FormArray = this.edit_Role.get('writePermissions') as FormArray;
    const read_Permissions: FormArray = this.edit_Role.get('readPermissions') as FormArray;
    for (let index = 0; index < this.readPermissions.length; index++) {
      if (read_Permissions.value[index]['checked'] == true) {
        permissionsId.push(new FormControl(read_Permissions.value[index]['permissionId']))
      }
    }
    for (let index = 0; index < this.writePermissions.length; index++) {
      if (write_Permissions.value[index]['checked'] == true) {
        permissionsId.push(new FormControl(write_Permissions.value[index]['permissionId']))
      }
    }
  }

  sendEditRole() {
    this.loading = true;
    console.log(this.edit_Role.value);
    if (this.edit_Role.invalid) {
      this.loadingFalse();
      return
    }
    this.push_permissionId();
    // this.edit_Role.removeControl('readPermissions');
    // this.edit_Role.removeControl('writePermissions');
    const editRole = this.edit_Role.value;
    console.log(this.edit_Role.value);
    this.roleService.updateRole(editRole).subscribe(res => {
      console.log(res);
      this.toastr.success("Role updated successfully", "Success");
      $('#editRoleModal').modal('hide');
    }, err => {
      if (err.status === 400) {
        this.toastr.warning(err.error.errorMessage, "Warning");
      }
      else
        this.toastr.error(err.error.errorMessage, "Error");
    }, () => {
      this.loadingFalse();
    });
  }

}
