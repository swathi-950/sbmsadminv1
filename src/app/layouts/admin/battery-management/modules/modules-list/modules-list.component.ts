import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/share/modal/modal';
import { ModuleService } from 'src/app/Services/batteries/module.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/Services/authentication.service';
declare var $;

@Component({
  selector: 'app-modules-list',
  templateUrl: './modules-list.component.html',
  styleUrls: ['./modules-list.component.css']
})
export class ModulesListComponent implements OnInit {
  moduleList: Module[] = [];
  delModule: Module; //del module
  enable_buttons: string[] = [];

  constructor(private moduleService: ModuleService,
    private auth: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllModuleList();
    this.subModuleListFromService();
    this.sub_auth_permission();
  }

  getAllModuleList() {
    this.moduleService.getModulesList().subscribe(res => {
      if (res.length != 0) {
        this.moduleList = res;
      } else {
        this.moduleList = [];
      }
    });
    this.moduleList = this.moduleService.module_List.value;
  }

  sub_auth_permission() {
    this.auth.permissions.subscribe(val => {
      if (val.length != 0) {
        this.enable_buttons = val;
      }
    })
  }
  
  subModuleListFromService() {
    this.moduleService.module_List.subscribe(val => {
      if (val.length != 0) {
        this.moduleList = val;
      } else {
        this.moduleList = [];
      }
    });
    console.log(this.moduleList);
  }

  edit(module) {
    this.moduleService.copyEditModuleList.next(module);
  }

  delete(module) {
    this.delModule = module;
  }

  deleteModule() {
    this.moduleService.moduleDelete(this.delModule.moduleId).subscribe(res => {
      console.log(res);
      this.toastr.success("Module deleted successfully", 'Success');
      $('#deleteModuleModal').modal('hide');
      this.getAllModuleList();
    })
  }

}
