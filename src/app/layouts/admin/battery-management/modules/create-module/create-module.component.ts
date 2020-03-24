import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidationsService } from 'src/app/Services/validations/validations.service';
import { ModuleService } from 'src/app/Services/batteries/module.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PackService } from 'src/app/Services/batteries/pack.service';
import { Packs } from 'src/app/share/modal/modal';

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.css']
})
export class CreateModuleComponent implements OnInit {
  createModule: FormGroup;
  validation;
  spin = false;
  packs: Packs[] = [];

  constructor(private validation_ser: ValidationsService,
    private fb: FormBuilder,
    private moduleService: ModuleService,
    private packService: PackService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getValidations();
    this.init_validations();
    this.getAllPacks();

  }

  getValidations() {
    this.validation = this.validation_ser.moduleCreation;
  }

  init_validations() {
    this.createModule = this.fb.group({
      moduleName: ['', [Validators.required, Validators.minLength(this.validation.moduleName.minLength), Validators.maxLength(this.validation.moduleName.maxLength)]],
      voltage: new FormGroup({
        value: new FormControl('',[Validators.required]),
        units: new FormControl('volts'),
      }),
      capacity: new FormGroup({
        value: new FormControl('',[Validators.required]),
        units: new FormControl('AH'),
      }),
      life: ['', [Validators.required, Validators.minLength(this.validation.life.minLength), Validators.maxLength(this.validation.life.maxLength)]],
      dateOfManufacture: ['', [Validators.required]],
      weight: ['', [Validators.required, Validators.minLength(this.validation.weight.minLength), Validators.maxLength(this.validation.weight.maxLength)]],
      warranty: ['', [Validators.required]],
      packName: ['', [Validators.required]]
    })
  }

  get f() {
    return this.createModule.controls;
  }

  getAllPacks() {
    this.packService.getPacks().subscribe(
      (res) => {
        console.log("get pack names", res);
        this.packs = res;
      }, (err) => {
        console.log(err);
      }
    )

  }
  onSubmit() {
    console.log(this.createModule.value);
    if (this.createModule.invalid) {
      this.toastr.warning("Please fill all fields.");
      return;
    }
    this.spin = true;
    this.moduleService.moduleCreate(this.createModule.value).subscribe(
      (res) => {
        console.log(res);
        this.spin = false;
        this.toastr.success("Module created successfully", 'Success');
        this.router.navigate(['./battery-management/modules/modules-list']);
      }, (err) => {
        console.log(err);
      }
    )


  }

}
