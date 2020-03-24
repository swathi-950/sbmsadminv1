import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class IpService {

  constructor() { }
  ip: string = "http://192.168.10.33:";
  login_Port: string = "8081";
  asset_Port: string = "2018";
  usermanagement_port: string = "2017";
  site_port: string = "2151";
  battery_port: string = "2019";
  pack_port: string = "2019";
  module_port: string = "2019"
}
