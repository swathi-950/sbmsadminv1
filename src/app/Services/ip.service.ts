import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class IpService {

  constructor() { }
  ip: string = "http://14.142.118.6:";
  login_Port: string = "8081";
  asset_Port: string = "2018";
  usermanagement_port: string = "2017";
  site_port: string = "2151";
  battery_port: string = "2019";
  pack_port: string = "2019";
  module_port: string = "2019"
}

// 33 -- 14.142.118.6
