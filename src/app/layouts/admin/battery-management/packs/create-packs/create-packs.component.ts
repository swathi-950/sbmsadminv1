import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationsService } from 'src/app/Services/validations/validations.service';
import { SiteService } from 'src/app/Services/site.service';
import { Sites } from 'src/app/share/modal/modal';
import { PackService } from 'src/app/Services/batteries/pack.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-packs',
  templateUrl: './create-packs.component.html',
  styleUrls: ['./create-packs.component.css']
})
export class CreatePacksComponent implements OnInit {
  createPack: FormGroup;
  sites: Sites[] = [];
  validation;
  spin = false;

  constructor(private validation_ser: ValidationsService,
    private fb: FormBuilder,
    private siteService: SiteService,
    private packService: PackService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getValidations();
    this.init_Validations();
    this.getAllSites();
  }

  getValidations() {
    this.validation = this.validation_ser.createPacks;
  }

  init_Validations() {
    this.createPack = this.fb.group({
      packName: ['', [Validators.required, Validators.minLength(this.validation.packName.minLength), Validators.maxLength(this.validation.packName.maxLength)]],
      packDescription: ['', [Validators.required, Validators.minLength(this.validation.packDescription.minLength), Validators.maxLength(this.validation.packDescription.maxLength)]],
      siteName: ['', [Validators.required, Validators.minLength(this.validation.siteName.minLength), Validators.maxLength(this.validation.siteName.maxLength)]]
    })
  }

  get f() {
    return this.createPack.controls;
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

  createPacks() {
    console.log(this.createPack.value);
    if (this.createPack.invalid) {
      this.toastr.warning("Please fill all fields.");
      return;
    }
    this.spin = true;
    this.packService.packCreate(this.createPack.value).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success("Pack created successfully", 'Success');
        this.router.navigate(['./battery-management/packs/packs-list']);
      },
      (err) => {
        this.spin = false;
        console.log(err);
      }
    )
  }

}
