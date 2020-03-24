import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidationsService } from 'src/app/Services/validations/validations.service';
import { ModuleService } from 'src/app/Services/batteries/module.service';
import { PackService } from 'src/app/Services/batteries/pack.service';
import { ToastrService } from 'ngx-toastr';
import { Packs } from 'src/app/share/modal/modal';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.css']
})
export class EditModuleComponent implements OnInit {

  updateModule: FormGroup;
  validation;
  packs: Packs[] = [];


  constructor(private validation_ser: ValidationsService,
    private fb: FormBuilder,
    private moduleService: ModuleService,
    private packService: PackService,
    private toastr: ToastrService, ) { }

  ngOnInit(): void {
    this.getAllPacks();
    this.getValidations();
    this.init_validations();
    this.sub_edit_Module();
  }

  getValidations() {
    this.validation = this.validation_ser.moduleCreation;
  }

  init_validations() {
    this.updateModule = this.fb.group({
      moduleId: ['', [Validators.required]],
      moduleName: ['', [Validators.required, Validators.minLength(this.validation.moduleName.minLength), Validators.maxLength(this.validation.moduleName.maxLength)]],
      voltage: new FormGroup({
        value: new FormControl('', [Validators.required]),
        units: new FormControl('volts'),
      }),
      capacity: new FormGroup({
        value: new FormControl('', [Validators.required]),
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
    return this.updateModule.controls;
  }

  sub_edit_Module() {
    this.moduleService.copyEditModuleList.subscribe(val => {
      this.updateModule.controls['moduleId'].setValue(val.moduleId);
      this.updateModule.controls['moduleName'].setValue(val.moduleName);
      this.updateModule.controls['voltage'].setValue(val.voltage);
      this.updateModule.controls['capacity'].setValue(val.capacity);
      this.updateModule.controls['life'].setValue(val.life);
      this.updateModule.controls['dateOfManufacture'].setValue(val.dateOfManufacture);
      this.updateModule.controls['weight'].setValue(val.weight);
      this.updateModule.controls['warranty'].setValue(val.warranty);
      this.updateModule.controls['packName'].setValue(val.packName);
    })
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

  editModule() {
    this.moduleService.moduleEdit(this.updateModule.value).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success("Module updted successfully", 'Success');
        this.updateModule.reset();
        $(document).ready(function () {
          $(".close").click();
        });
        this.moduleService.getModulesList().subscribe();
      }, (err) => {
        console.log(err);
        this.toastr.error("Some thing went worng.", "Error");
      }
    )
  }

}
