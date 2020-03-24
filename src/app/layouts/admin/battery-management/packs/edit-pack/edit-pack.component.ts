import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sites } from 'src/app/share/modal/modal';
import { ValidationsService } from 'src/app/Services/validations/validations.service';
import { SiteService } from 'src/app/Services/site.service';
import { PackService } from 'src/app/Services/batteries/pack.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-pack',
  templateUrl: './edit-pack.component.html',
  styleUrls: ['./edit-pack.component.css']
})
export class EditPackComponent implements OnInit {
  updatePack: FormGroup;
  sites: Sites[] = [];
  validation;

  constructor(private validation_ser: ValidationsService,
    private fb: FormBuilder,
    private siteService: SiteService,
    private packService: PackService,
    private toastr: ToastrService, ) { }

  ngOnInit(): void {
    this.getAllSites();
    this.getValidations();
    this.init_Validations();
    this.sub_Edit_Pack();

  }

  getValidations() {
    this.validation = this.validation_ser.createPacks;
  }

  init_Validations() {
    this.updatePack = this.fb.group({
      id: ['', [Validators.required]],
      packName: ['', [Validators.required, Validators.minLength(this.validation.packName.minLength), Validators.maxLength(this.validation.packName.maxLength)]],
      packDescription: ['', [Validators.required, Validators.minLength(this.validation.packDescription.minLength), Validators.maxLength(this.validation.packDescription.maxLength)]],
      siteName: ['', [Validators.required, Validators.minLength(this.validation.siteName.minLength), Validators.maxLength(this.validation.siteName.maxLength)]]
    })
  }

  sub_Edit_Pack() {
    this.packService.copyEditPackList.subscribe(val => {
      this.updatePack.controls['id'].setValue(val.id);
      this.updatePack.controls['packName'].setValue(val.packName);
      this.updatePack.controls['packDescription'].setValue(val.packDescription);
      this.updatePack.controls['siteName'].setValue(val.siteName);
    })
  }

  get f() {
    return this.updatePack.controls;
  }

  getAllSites() {
    this.siteService.getSities().subscribe(
      (res) => {
        console.log("sites res", res);
        this.sites = res;
      }, (err) => {
        console.log(err);
      }
    )
  }

  editPack() {
    this.packService.editPack(this.updatePack.value).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success("Pack updated successfully", 'Success');
        this.updatePack.reset();
        $(document).ready(function () {
          $(".close").click();
        });
        this.packService.getPacks().subscribe();
      }, (err) => {
        console.log(err);
        this.toastr.error("Some thing went worng.", "Error");
      }
    )

  }

}
