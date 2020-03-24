import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import * as $ from "jquery";
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    mobile_menu_visible: any = 0;
    windowSize = $(window).width();

    userName = null;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.windowSize = event.target.innerWidth;
        this.window(event.target.innerWidth);
    }

    constructor(
        private auth: AuthenticationService) {
    }

    ngOnInit() {
        this.window(this.windowSize);
        this.displayUserName();
    }

    displayUserName() {
        this.auth.userName.subscribe(val => {
            this.userName = val;
        })
    }


    window(windowSize: Number) {
        if (windowSize < 991) {
            $(document).ready(function () {
                $(".navbarTitle").hide("fast");
                $("#navbarTitleSmall").show();
            });
        } else {
            $(document).ready(function () {
                $(".navbarTitle").show("fast");
                $("#navbarTitleSmall").hide();
            });
        }
    }


    // showSideBar() {
    //     $(document).ready(function () {
    //         $("#sidebar, #content").toggleClass('active');
    //     });
    // }

    logout() {
        this.auth.logout();
    }

}
