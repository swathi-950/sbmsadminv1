import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RoleService } from 'src/app/Services/roles/role.service';
import { ValidationsService } from 'src/app/Services/validations/validations.service';

@Component({
  selector: 'app-create-permissions',
  templateUrl: './create-permissions.component.html',
  styleUrls: ['./create-permissions.component.css']
})

export class CreatePermissionsComponent implements OnInit {

  loading: boolean;
  validations;
  permission: FormGroup;

  constructor(private fb: FormBuilder,
    private roleService: RoleService,
    private router: Router,
    private toastr: ToastrService,
    private validate_ser: ValidationsService) {
    this.init_validations();
  }

  ngOnInit(): void {
    this.init_validations();
    this.init_form();
  }

  init_validations() {
    this.validations = this.validate_ser.permissions;
  }

  init_form() {
    this.permission = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(this.validations.name.minLength), Validators.maxLength(this.validations.name.maxLength)]],
      description: ['', [Validators.required, Validators.minLength(this.validations.description.minLength), Validators.maxLength(this.validations.description.maxLength)]],
      permissionAccess: ['READ', [Validators.required]],
    });
  }

  loadingfalse() {
    this.loading = false;
  }

  get f() {
    return this.permission.controls;
  }

  createPermissions() {
    this.loading = true;

    if (this.permission.invalid) {
      this.toastr.warning("Please fill all fields", "Warning");
      return
    }
    this.permission.value.permissionAccess.toUpperCase();
    this.roleService.createPermission(this.permission.value).subscribe(res => {
      console.log(res);
      this.toastr.success('Permission created successfully', 'Success')
      this.router.navigate(['/user-management/permissions/permissions-list']);
    }, err => {
      if (err.status === 400) {
        this.toastr.warning(err.error.errorMessage, "Warning");
      }
      else
        this.toastr.error(err.error.errorMessage, "Error");
    });
    this.loadingfalse();
  }

}
