import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  permissionsIds = [];
  userName;
  roleName;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    console.log(this.permissionsIds);
    this.displayUserName();
    this.sub_permissions();
  }

  displayUserName() {
    this.auth.userName.subscribe(val => {
      this.userName = val;
    })

    this.auth.roleName.subscribe(val => {
      this.roleName = val;
    })
  }

  sub_permissions() {
    this.auth.permissions.subscribe(val => {
      if (val.length != 0) {
        this.permissionsIds = val;
        console.log(this.permissionsIds);

      }
    })
  }

}
