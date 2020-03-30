import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private unsub_route: Subscription;
  router_dashboard: boolean;

  constructor(private router: Router) {
    this.sub_router();
  }

  ngOnInit() {

  }

  sub_router() {
    this.unsub_route = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(e => {
        if (e instanceof NavigationEnd) {
          console.log(e.url.includes('/dashboard'), e.id);
          if (e.url.includes('/dashboard')) {
            this.router_dashboard = true;
            this.remove_margin();
          } else {
            this.router_dashboard = false
          }
        }
      })
  }

  remove_margin() {
    const dashboard_margin = document.getElementById('inner-content-margin') as HTMLElement;
    console.log(dashboard_margin);
    dashboard_margin.style.margin = '0% 0%';
    dashboard_margin.style.padding = '2%';
    dashboard_margin.style.backgroundColor = '#f8f8f8';
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsub_route.unsubscribe();
  }
}
