import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RoleService } from 'src/app/Services/roles/role.service';
import { ValidationsService } from 'src/app/Services/validations/validations.service';
import { permissionsList } from 'src/app/share/modal/modal';

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.css']
})

export class CreateRolesComponent implements OnInit {

  createRole: FormGroup;
  permissions = [];
  readPermissions: permissionsList[] = [];
  writePermissions: permissionsList[] = [];
  validations;
  loading: boolean;

  constructor(private fb: FormBuilder,
    private roleService: RoleService,
    private router: Router,
    private toastr: ToastrService,
    private validate_ser: ValidationsService) {
    this.init_validations();
  }

  ngOnInit(): void {
    this.roleService.getPermissionsWith_Read_wirte().subscribe();
    this.getpermissionsFromService();
    this.initCreateRole();
    this.bindAlias();
  }


  bindAlias() {
    this.createRole.controls['name'].valueChanges.subscribe((val) => {
      this.createRole.controls['aliasName'].setValue(val.toLowerCase())
    })
  }

  init_validations() {
    this.validations = this.validate_ser.roles;
  }

  getpermissionsFromService() {
    this.roleService.permissionList_read_write.subscribe(val => {
      console.log("val", val);
      if (val != null) {
        this.readPermissions = val.READ;
        this.writePermissions = val.WRITE;
        this.init_read_permissions();
        this.init_write_permissions();
      }
      console.log("read per", this.readPermissions);
      console.log("write per", this.writePermissions);
    });
  }

  initCreateRole() {
    this.createRole = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(this.validations.name.minLength), Validators.maxLength(this.validations.name.maxLength)]],
      description: ['', [Validators.required, Validators.minLength(this.validations.description.minLength), Validators.maxLength(this.validations.description.maxLength)]],
      aliasName: ['', [Validators.required]],
      permissionsId: this.fb.array([]),
      readPermissions: this.fb.array(this.readPermissions),
      writePermissions: this.fb.array(this.writePermissions)
    })
  }

  init_read_permissions() {
    const read_Permissions: FormArray = this.createRole.get('readPermissions') as FormArray;
    read_Permissions.controls = [];
    this.readPermissions.forEach((val, i) => {
      read_Permissions.push(new FormControl({
        'checked': false,
        'name': this.readPermissions[i].name,
        'permissionId': this.readPermissions[i].permissionId,
        'id': this.readPermissions[i].id
      }))
    });
    console.log(read_Permissions.value);
  }

  init_write_permissions() {
    const write_Permissions: FormArray = this.createRole.get('writePermissions') as FormArray;
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

  onCheckboxChangeRead(event, index) {
    const permissions: FormArray = this.createRole.get('readPermissions') as FormArray;
    if (event.target.checked) {
      permissions.value[index]['checked'] = true;
    } else {
      permissions.value[index]['checked'] = false;
    }
  }

  onCheckboxChangeWrite(event, index) {
    const permissions: FormArray = this.createRole.get('writePermissions') as FormArray;
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
    return this.createRole.controls;
  }


  push_permissionId() {
    const permissionsId: FormArray = this.createRole.get('permissionsId') as FormArray;
    const write_Permissions: FormArray = this.createRole.get('writePermissions') as FormArray;
    const read_Permissions: FormArray = this.createRole.get('readPermissions') as FormArray;
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

  sendCreateRole() {
    this.loading = true;
    console.log(this.createRole.value);
    if (this.createRole.invalid) {
      this.loading = false;
      return
    }
    this.push_permissionId();
    console.clear();
    console.log(this.createRole.value);

    this.roleService.createRole(this.createRole.value).subscribe(res => {
      console.log(res);
      this.toastr.success("Role created successfully", "Success");
      this.router.navigate(['/user-management/roles/roles-list']);
    }, err => {
      if (err.status === 400) {
        this.toastr.warning(err.error.errorMessage, "Warning");
      }
      else
        this.toastr.error(err.error.errorMessage, "Error");
    });
    this.loadingFalse();
  }

}
