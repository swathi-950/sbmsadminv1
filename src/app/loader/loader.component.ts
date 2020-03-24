import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  spinner: boolean;
  unsub: Subscription;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.spinnerMethod();
  }

  spinnerMethod() {
    this.unsub = this.auth.spiner.subscribe(val => {
      if (val) {
        this.spinner = val;
        const spin = document.getElementById('spinner') as HTMLElement;
        spin.style.display = 'block';
      } else {
        this.spinner = val;
        const spin = document.getElementById('spinner') as HTMLElement;
        spin.style.display = 'none';
      }
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsub.unsubscribe();
  }

}
