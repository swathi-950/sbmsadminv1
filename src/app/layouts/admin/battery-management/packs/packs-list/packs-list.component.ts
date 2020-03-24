import { Component, OnInit } from '@angular/core';
import { Packs } from 'src/app/share/modal/modal';
import { PackService } from 'src/app/Services/batteries/pack.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/Services/authentication.service';
declare var $;

@Component({
  selector: 'app-packs-list',
  templateUrl: './packs-list.component.html',
  styleUrls: ['./packs-list.component.css']
})
export class PacksListComponent implements OnInit {
  packList: Packs[] = [];
  delPack: Packs; //del pack
  enable_buttons: string[] = [];

  constructor(private packService: PackService,
    private auth: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllPacks();
    this.subPacksListFromService();
    this.sub_auth_permission();
  }

  getAllPacks() {
    this.packService.getPacks().subscribe(res => {
      if (res.length != 0) {
        this.packList = res;
      } else {
        this.packList = [];
      }
    });
    this.packList = this.packService.packs_List.value;
  }

  sub_auth_permission() {
    this.auth.permissions.subscribe(val => {
      if (val.length != 0) {
        this.enable_buttons = val;
      }
    })
  }

  subPacksListFromService() {
    this.packService.packs_List.subscribe(val => {
      if (val.length != 0) {
        this.packList = val;
      } else {
        this.packList = [];
      }
    });
    console.log(this.packList);
  }

  edit(packs) {
    this.packService.copyEditPackList.next(packs);

  }

  delete(packs) {
    this.delPack = packs;
  }

  deletePack() {
    this.packService.packDelete(this.delPack.id).subscribe(res => {
      console.log(res);
      this.toastr.success("Pack deleted successfully", 'Success');
      $('#deletePackModal').modal('hide');
      this.getAllPacks();
    }
    )
  }

}
