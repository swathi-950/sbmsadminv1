import { Component, OnInit } from '@angular/core';
import { Battery } from 'src/app/share/modal/modal';
import { BatteryService } from 'src/app/Services/batteries/battery.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/Services/authentication.service';
declare var $;

@Component({
  selector: 'app-battery-list',
  templateUrl: './battery-list.component.html',
  styleUrls: ['./battery-list.component.css']
})
export class BatteryListComponent implements OnInit {
  batteryList: Battery[] = [];
  delBattery: Battery; //del battery
  enable_buttons: string[] = [];

  constructor(private batteryService: BatteryService,
    private auth: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllBatteryList();
    this.subBatteryListFromService();
    this.sub_auth_permission();
  }


  sub_auth_permission() {
    this.auth.permissions.subscribe(val => {
      if (val.length != 0) {
        this.enable_buttons = val;
      }
    })
  }

  getAllBatteryList() {
    this.batteryService.getBatteries().subscribe(res => {
      if (res.length != 0) {
        this.batteryList = res;
      } else {
        this.batteryList = [];
      }
    });
    this.batteryList = this.batteryService.batteries_List.value;
  }

  subBatteryListFromService() {
    this.batteryService.batteries_List.subscribe(val => {
      if (val.length != 0) {
        this.batteryList = val;
      } else {
        this.batteryList = []
      }
    });
    console.log(this.batteryList);
  }

  edit(battery) {
    this.batteryService.copyEditBatteryList.next(battery);
  }

  delete(battery) {
    this.delBattery = battery;
  }

  deleteBattery() {
    this.batteryService.deleteBattery(this.delBattery.batteryId).subscribe(res => {
      console.log(res);
      this.toastr.success("Battery deleted successfully", 'Success');
      $('#deleteBatteryModal').modal('hide');
      this.getAllBatteryList();
    }

    )
  }



}
