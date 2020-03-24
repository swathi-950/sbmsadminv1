import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Country, State, City, permissionsList, RoleList, AssetCategory } from 'src/app/share/modal/modal';
import { UserService } from 'src/app/Services/roles/user.service';
import { RoleService } from 'src/app/Services/roles/role.service';
import { ValidationsService } from 'src/app/Services/validations/validations.service';
import { MustMatch } from 'src/app/signup/mustMatch';
import { AssetService } from 'src/app/Services/asset.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})

export class CreateUsersComponent implements OnInit {

  validation;
  userForm: FormGroup;
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  roles: RoleList[] = []
  extensionNumber = '';
  extensionNo: any;
  spin = false;
  id;
  permissions: string[] = [];
  permissionsList: permissionsList[] = [];
  generatedPermissionsList = [];
  assetsList: AssetCategory[] = [];

  read_permissions: permissionsList[] = [];
  write_Permissions: permissionsList[] = [];

  constructor(private fb: FormBuilder,
    private user: UserService,
    private roleService: RoleService,
    private toastr: ToastrService,
    private router: Router,
    private validation_ser: ValidationsService,
    private ser_asset: AssetService) {
  }

  ngOnInit(): void {

    this.getValidations();
    this.userFormValidations();
    this.getCountries();
    this.getPermissionsList();
    this.getRoles();
    this.subRolelistById();
    this.getAssetCategory();
  }

  getValidations() {
    this.validation = this.validation_ser.userCreation;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userForm.setControl('permissions', this.fb.array([]));
  }

  userFormValidations() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(this.validation.firstName.minLength), Validators.maxLength(this.validation.firstName.maxLength)]],
      lastName: ['', [Validators.required, Validators.minLength(this.validation.lastName.minLength), Validators.maxLength(this.validation.lastName.maxLength)]],
      userName: ['', [Validators.required, Validators.minLength(this.validation.userName.minLength), Validators.maxLength(this.validation.userName.maxLength)]],
      emailId: ['', [Validators.required, Validators.pattern(this.validation.emailId.pattern)]],
      password: ['', [Validators.required, Validators.minLength(this.validation.password.minLength), Validators.maxLength(this.validation.password.maxLength)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(this.validation.confirmPassword.minLength), Validators.maxLength(this.validation.confirmPassword.maxLength)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(this.validation.phoneNumber.minLength), Validators.maxLength(this.validation.phoneNumber.maxLength)]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      role: ['', [Validators.required]],
      permissionsId: this.fb.array([]),
      readPermissions: this.fb.array([]),
      writePermissions: this.fb.array([]),
      assetCategoryId: this.fb.array([]),
      form_assetsList: this.fb.array([])
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  /* get asset list */
  getAssetCategory() {
    this.ser_asset.getAssetCategoryList().subscribe();
    this.ser_asset.assetCategoryList.subscribe(val => {
      if (val.length != 0) {
        this.assetsList = val;
        this.init_asset_checkbox();
      }
    })
  }

  init_asset_checkbox() {
    const asset_list: FormArray = this.userForm.get('form_assetsList') as FormArray;
    asset_list.controls = [];
    for (let i = 0; i < this.assetsList.length; i++) {
      if (this.assetsList[i].categoryName == "BMS") {
        asset_list.push(new FormControl({
          checked: true,
          assetCategoryId: this.assetsList[i].assetCategoryId,
          categoryName: this.assetsList[i].categoryName,
        }))
      } else {
        asset_list.push(new FormControl({
          checked: false,
          assetCategoryId: this.assetsList[i].assetCategoryId,
          categoryName: this.assetsList[i].categoryName,
        }))
      }
    }
  }

  onCheckboxCategoryChange(event, i) {
    const assetCategoryId: FormArray = this.userForm.get('form_assetsList') as FormArray;
    if (event.target.checked) {
      assetCategoryId.value[i]['checked'] = true;
    } else {
      assetCategoryId.value[i]['checked'] = false;
    }
  }

  getPermissionsList() {
    this.roleService.getPermissionsWith_Read_wirte().subscribe();
    this.roleService.permissionList_read_write.subscribe(val => {
      if (val !== null) {
        this.read_permissions = val.READ;
        this.write_Permissions = val.WRITE;
        console.log("val create", val);
        this.addPermissionsListToForm();
      }
    });
  }

  addPermissionsListToForm() {
    this.init_read_permissions();
    this.init_write_permissions();
  }

  init_read_permissions() {
    const read_Permissions: FormArray = this.userForm.get('readPermissions') as FormArray;
    read_Permissions.controls = [];
    this.read_permissions.forEach((val, i) => {
      read_Permissions.push(new FormControl({
        'checked': false,
        'name': this.read_permissions[i].name,
        'permissionId': this.read_permissions[i].permissionId,
        'id': this.read_permissions[i].id
      }))
    });
  }

  init_write_permissions() {
    const write_Permissions: FormArray = this.userForm.get('writePermissions') as FormArray;
    write_Permissions.controls = [];
    this.write_Permissions.forEach((val, i) => {
      write_Permissions.push(new FormControl({
        'checked': false,
        'name': this.write_Permissions[i].name,
        'permissionId': this.write_Permissions[i].permissionId,
        'id': this.write_Permissions[i].id
      }))
    })
  }

  subRolelistById() {
    this.user.roleListById.subscribe(val => {
      if (val != null) {
        this.permissions = val.permissionsId;
      }
      console.log("roleListById ", this.permissions);
      this.selectCheckBox();
    })
  }

  selectCheckBox() {
    this.reset_checkBox();
    this.select_checkBox_read();
    this.select_checkBox_write();
  }

  select_checkBox_read() {
    const read_permissions = this.userForm.get('readPermissions') as FormArray;
    for (let i = 0; i < this.read_permissions.length; i++) {
      for (let j = 0; j < this.permissions.length; j++) {
        // console.log("read_permissions.value[i]['permissionId']----- ", read_permissions.value[i]['permissionId']);
        // console.log("this.permissions[j]--------------------------- ", this.permissions[j]);
        if (read_permissions.value[i]['permissionId'] == this.permissions[j]) {
          read_permissions.value[i]['checked'] = true;
        }
      }
    }
  }

  reset_checkBox() {
    const read_permissions = this.userForm.get('readPermissions') as FormArray;
    const write_permissions = this.userForm.get('writePermissions') as FormArray;
    for (let i = 0; i < this.read_permissions.length; i++) {
      read_permissions.value[i]['checked'] = false;
    }
    for (let i = 0; i < this.write_Permissions.length; i++) {
      write_permissions.value[i]['checked'] = false;
    }
  }

  select_checkBox_write() {
    const write_permissions = this.userForm.get('writePermissions') as FormArray;
    for (let i = 0; i < this.write_Permissions.length; i++) {
      for (let k = 0; k < this.permissions.length; k++) {
        if (write_permissions.value[i]['permissionId'] == this.permissions[k]) {
          write_permissions.value[i]['checked'] = true;
        }
      }
    }
  }

  onCheckboxChangeRead(event, index) {
    const permissions: FormArray = this.userForm.get('readPermissions') as FormArray;
    if (event.target.checked) {
      permissions.value[index]['checked'] = true;
    } else {
      permissions.value[index]['checked'] = false;
    }
  }

  onCheckboxChangeWrite(event, index) {
    const permissions: FormArray = this.userForm.get('writePermissions') as FormArray;
    if (event.target.checked) {
      permissions.value[index]['checked'] = true;
    } else {
      permissions.value[index]['checked'] = false;
    }
  }

  get f() {
    return this.userForm.controls;
  }

  getCountries() {
    this.user.getCountries().subscribe(
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
    this.user.getStates(country_id).subscribe(
      (res) => {
        console.log(res);
        this.states = res;
        this.cities = [];
      },
      (err) => {
        console.log(err);
      }
    )
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
    this.user.getCities(state_id).subscribe(
      (res) => {
        console.log(res);
        this.cities = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getRoles() {
    this.roleService.getRoleList().subscribe(
      (res) => {
        console.log(res);
        this.roles = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  selectRolename(name) {
    console.log(name);
    let number = this.roles.filter(v => v.name == name);
    console.log(number);
    if (number.length !== 0) {
      this.permissions = number[0].permissionsId;
      console.log("this.permissions", this.permissions);
      this.selectCheckBox();
      // this.getRolesById(number[0].id);
    } else {
      this.toastr.warning('Please select role', 'Warning');
      const permissions: FormArray = this.userForm.get('permissions') as FormArray;
      console.log('Permissoin List', permissions);
      console.log('Permissions List Length', permissions.value.length);

      for (let i = 0; i < permissions.value.length; i++) {
        if (permissions.value[i].checked == true)
          permissions.value[i].checked = false;
      }
    }
  }

  getRolesById(id: string) {
    this.user.getRoleById(id).subscribe();
  }

  push_permissionId() {
    const permissionsId: FormArray = this.userForm.get('permissionsId') as FormArray;
    const write_Permissions: FormArray = this.userForm.get('writePermissions') as FormArray;
    const read_Permissions: FormArray = this.userForm.get('readPermissions') as FormArray;
    for (let index = 0; index < this.read_permissions.length; index++) {
      if (read_Permissions.value[index]['checked'] == true) {
        permissionsId.push(new FormControl(read_Permissions.value[index]['permissionId']))
      }
    }
    for (let index = 0; index < this.write_Permissions.length; index++) {
      if (write_Permissions.value[index]['checked'] == true) {
        permissionsId.push(new FormControl(write_Permissions.value[index]['permissionId']))
      }
    }
  }

  push_assetList() {
    const asset_list: FormArray = this.userForm.get('assetCategoryId') as FormArray;
    const form_assetsList: FormArray = this.userForm.get('form_assetsList') as FormArray;
    asset_list.controls = [];
    for (let index = 0; index < this.assetsList.length; index++) {
      if (form_assetsList.value[index]['checked'] == true) {
        asset_list.push(new FormControl(form_assetsList.value[index]['assetCategoryId']))
      }
    }
    if (asset_list.length === 0) {
      return false;
    } else return true;
  }

  onSubmit() {
    this.spin = true;
    console.log(this.userForm.value);
    if (this.userForm.invalid) {
      this.spin = false;
      this.toastr.warning('Please fill all fields.');
      return
    }
    this.push_permissionId();
    this.push_assetList();
    console.log(this.userForm.value);
    console.log("this.userForm.value", this.userForm.value);

    if (this.push_assetList())
      this.user.createByUser(this.userForm.value).subscribe(
        (res) => {
          console.log(res);
          this.spin = false;
          this.user.roleListById.next(null);
          this.userForm.reset();
          this.toastr.success('User created successfully', 'Success');
          this.router.navigate(['user-management/users/users-list']);
        },
        (err) => {
          console.log(err);
          this.spin = false;
          if (err.status == 400) {
            this.toastr.error(err.error.errorMessage, 'Error');
          }
        })
  }

}
