import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IpService } from '../ip.service';
import { Battery } from 'src/app/share/modal/modal';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BatteryService {
  private Ip = this.ip.ip;
  private Battery_port = this.ip.battery_port;
  private baseUrl = "/rest/v1/battery";

  batteries_List = new BehaviorSubject<Battery[]>([]);
  copyEditBatteryList = new Subject<Battery>();

  constructor(private http: HttpClient,
    private ip: IpService,
    private errHandler: ErrorHandlerService,

  ) { }

  //Create Battery
  batteryCreation(battery: Battery): Observable<Battery> {
    console.log(battery);
    return this.http.post<Battery>(`${this.Ip}${this.Battery_port}${this.baseUrl}/create`, battery)
      .pipe(catchError(this.errHandler.handleError));
  }

  //List of batteries
  getBatteries() {
    return this.http.get<Battery[]>(`${this.Ip}${this.Battery_port}${this.baseUrl}`)
      .pipe(
        map(res => {
          this.batteries_List.next(res);
          console.log("batteries_List", res);
          return res;
        }),
        (catchError(this.errHandler.handleError))
      );
  }

  //delete battery
  deleteBattery(batteryId) {
    return this.http.delete(`${this.Ip}${this.Battery_port}${this.baseUrl}/${batteryId}`).pipe(
      map((res) => {
        this.getBatteries().subscribe();
        return res
      }),
      (catchError(this.errHandler.handleError))
    );
  }

  //Edit battery
  editBattery(battery: Battery) {
    return this.http.put(`${this.Ip}${this.Battery_port}${this.baseUrl}/${battery.batteryId}`, battery)
      .pipe(catchError(this.errHandler.handleError));
  }
}


