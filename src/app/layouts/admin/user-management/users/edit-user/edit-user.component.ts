import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/Services/roles/user.service';
import { State, City, RoleName, Country, User, permissionsList } from 'src/app/share/modal/modal';
import { RoleService } from 'src/app/Services/roles/role.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  maxLen = {
    firstName: 16,
    lastName: 16,
    phoneNumber: 10,
  }
  selectedUser: User;
  id;
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  roles: RoleName[] = [];
  selectedCountry: User = null;
  extensionNumber = '';
  extensionNo: any;
  permissions = [];
  permissionsList: permissionsList[] = [];
  readPermissions = [];
  writePermissions = [];
  /*  country: null;
   state: null;
   city: null; */
  userForm = this.fb.group({
    id: ['', [Validators.required]],
    firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(this.maxLen.firstName)]],
    lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(this.maxLen.lastName)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(this.maxLen.phoneNumber)]],
    country: ['', [Validators.required]],
    state: ['', [Validators.required]],
    city: ['', [Validators.required]],
    role: ['', [Validators.required]],
    permissionsId: this.fb.array([]),
    readPermissions: this.fb.array([]),
    writePermissions: this.fb.array([])
  });

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.getCountries();
    this.getRoles();
    this.getPermissionsWith_Read_wirte();
    this.subRolelistById();
    this.sub_copy_edit_User();
  }

  sub_copy_edit_User() {
    this.userService.copyEditUser.subscribe(res => {
      this.userForm.controls['id'].setValue(res.id);
      this.userForm.controls['firstName'].setValue(res.firstName);
      this.userForm.controls['lastName'].setValue(res.lastName);
      this.userForm.controls['phoneNumber'].setValue(res.phoneNumber);
      this.userForm.controls['country'].setValue(res.country);
      this.userForm.controls['state'].setValue(res.state);
      this.userForm.controls['city'].setValue(res.city);
      this.userForm.controls['role'].setValue(res.role);
      this.selectedUser = res;
      console.log("this.selectedUser",this.selectedUser);
      this.permissions = res.permissionsId;
      /* call countires states cities on change */
      this.init_country_state_city();
      /*   this.userForm.controls['permissions'].patchValue(res.permissions); */
      this.selectCheckBox();
    })
  }

  getPermissionsWith_Read_wirte() {
    this.roleService.getPermissionsWith_Read_wirte().subscribe();
    this.roleService.permissionList_read_write.subscribe(val => {
      if (val !== null) {
        this.readPermissions = val.READ;
        this.writePermissions = val.WRITE;
        this.addPermissionsListToForm();
      }
    });
  }

  /* initialize permissions */
  addPermissionsListToForm() {
    this.init_read_permissions();
    this.init_write_permissions();
  }

  /* initialize read permissions */
  init_read_permissions() {
    const read_Permissions: FormArray = this.userForm.get('readPermissions') as FormArray;
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

  /* initialize write permissions */
  init_write_permissions() {
    const write_Permissions: FormArray = this.userForm.get('writePermissions') as FormArray;
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



  init_country_state_city() {
    console.log("init_country_state_city -------- country", this.selectedUser.country);
    this.Filter(this.selectedUser.country);
    console.log("init_country_state_city -------- state", this.selectedUser.state);
    setTimeout(() => { this.selectedState(this.selectedUser.state); }, 300);
  }

  get f() {
    return this.userForm.controls;
  }

  getCountries() {
    this.userService.getCountries().subscribe(
      (res) => {
        console.log(res);
        this.countries = res;
        this.states = [];
        this.cities = [];
      },
      (err) => {
        console.error(err);
      }
    )
  }

  Filter(name) {
    console.log(name);
    let number = this.countries.filter(v => v.name == name);
    console.log(number);
    if (number.length !== 0) {
      this.getStates(number[0].country_id);
    }
  }

  getStates(country_id: number) {
    console.log(country_id);
    this.userService.getStates(country_id).subscribe(
      (res) => {
        console.log(res);
        this.states = res;
        this.cities = [];
      },
      (err) => {
        console.log(err);
      })
  }

  selectedState(name) {
    console.log(name);
    let number = this.states.filter(v => v.name == name);
    console.log(number);
    if (number.length != 0) {
      this.getCities(+number[0].state_id);
    }
  }

  getCities(state_id: number) {
    console.log(state_id);
    this.userService.getCities(state_id).subscribe(
      (res) => {
        console.log(res);
        this.cities = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  //Get roles
  getRoles() {
    this.userService.getRole().subscribe(
      (res) => {
        console.log(res);
        this.roles = res;
        console.log(this.roles);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  //role filter
  selectedRolename(name) {
    console.log("role:", name);
    let number = this.roles.filter(x => x.name == name);
    console.log(number);
    if (number.length !== 0) {
      this.id = number[0].roleId;
      console.log(this.id);
      this.getRolesById(number[0].id);
    } /* else {
      this.toastr.warning('Please select role', 'Warning');
    } */
  }

  //role by id permissions
  getRolesById(roleId: string) {
    this.userService.getRoleById(roleId).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      })
  }

  subRolelistById() {
    this.userService.roleListById.subscribe(val => {
      if (val != null) {
        this.permissions = val.permissionsId;
      }
      console.log("roleListById ", this.permissions);
      this.selectCheckBox();
    })
  }

  /* update check box by role */
  selectCheckBox() {
    this.reset_checkBox();
    this.select_checkBox_read();
    this.select_checkBox_write();
  }

  reset_checkBox() {
    const read_permissions = this.userForm.get('readPermissions') as FormArray;
    const write_permissions = this.userForm.get('writePermissions') as FormArray;
    for (let i = 0; i < this.readPermissions.length; i++) {
      read_permissions.value[i]['checked'] = false;
    }
    for (let i = 0; i < this.writePermissions.length; i++) {
      write_permissions.value[i]['checked'] = false;
    }
  }

  select_checkBox_read() {
    const read_permissions = this.userForm.get('readPermissions') as FormArray;
    for (let i = 0; i < this.readPermissions.length; i++) {
      for (let j = 0; j < this.permissions.length; j++) {
        console.log("read_permissions.value[i]['permissionId']----- ", read_permissions.value[i]['permissionId']);
        console.log("this.permissions[j]--------------------------- ", this.permissions[j]);
        if (read_permissions.value[i]['permissionId'] == this.permissions[j]) {
          read_permissions.value[i]['checked'] = true;
        }
      }
    }
  }


  select_checkBox_write() {
    const write_permissions = this.userForm.get('writePermissions') as FormArray;
    for (let i = 0; i < this.writePermissions.length; i++) {
      for (let k = 0; k < this.permissions.length; k++) {
        if (write_permissions.value[i]['permissionId'] == this.permissions[k]) {
          write_permissions.value[i]['checked'] = true;
        }
      }
    }
  }

  //on change read check box
  onCheckboxChangeRead(event, index) {
    const permissions: FormArray = this.userForm.get('readPermissions') as FormArray;
    if (event.target.checked) {
      permissions.value[index]['checked'] = true;
    } else {
      permissions.value[index]['checked'] = false;
    }
  }

  //on change write check box
  onCheckboxChangeWrite(event, index) {
    const permissions: FormArray = this.userForm.get('writePermissions') as FormArray;
    if (event.target.checked) {
      permissions.value[index]['checked'] = true;
    } else {
      permissions.value[index]['checked'] = false;
    }
  }

  push_permissionId() {
    const permissionsId: FormArray = this.userForm.get('permissionsId') as FormArray;
    const write_Permissions: FormArray = this.userForm.get('writePermissions') as FormArray;
    const read_Permissions: FormArray = this.userForm.get('readPermissions') as FormArray;
    permissionsId.controls = [];
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

  //Update user
  editUser() {
    console.log(this.userForm.value);
    if (this.userForm.invalid) {
      this.toastr.error("Please fill all fields.", "Error");
      return
    }
    this.push_permissionId();
    console.log(this.userForm.value);
    this.userService.updateUsers(this.userForm.value, this.userForm.controls['id'].value).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('User updated successfully', 'Success');
        /*  const permissions = this.userForm.get('permissions') as FormArray;
         permissions.controls = [];
         this.userForm.reset(); */
        $(document).ready(function () {
          $(".close").click();
        });
      }, (err) => {
        console.log(err);
        this.toastr.error(err.error.errorMessage, "Error");
      }, () => {
        this.userService.getUsers().subscribe();
      }
    )
  }

}
