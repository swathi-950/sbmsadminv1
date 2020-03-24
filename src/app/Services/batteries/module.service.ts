import { Injectable } from '@angular/core';
import { IpService } from '../ip.service';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Module } from 'src/app/share/modal/modal';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private Ip = this.ip.ip;
  private module_port = this.ip.module_port;
  private baseUrl = "/rest/v1/modules";

  module_List = new BehaviorSubject<Module[]>([]);
  copyEditModuleList = new Subject<Module>();

  constructor(private ip: IpService,
    private http: HttpClient,
    private errHandler: ErrorHandlerService) { }

  //Create module

  moduleCreate(module: Module): Observable<Module> {
    console.log(module);
    return this.http.post<Module>(`${this.Ip}${this.module_port}${this.baseUrl}/create`, module)
      .pipe(catchError(this.errHandler.handleError));
  }

  //list of modules
  getModulesList() {
    return this.http.get<Module[]>(`${this.Ip}${this.module_port}${this.baseUrl}`)
      .pipe(
        map(res => {
          this.module_List.next(res);
          console.log("module_List", res);
          return res;
        }),
        (catchError(this.errHandler.handleError))
      );
  }

  //delete module
  moduleDelete(moduleId) {
    return this.http.delete(`${this.Ip}${this.module_port}${this.baseUrl}/${moduleId}`).pipe(
      map((res) => {
        this.getModulesList().subscribe();
        return res
      }),
      (catchError(this.errHandler.handleError))
    );
  }

  //edit module
  moduleEdit(module: Module) {
    return this.http.put(`${this.Ip}${this.module_port}${this.baseUrl}/${module.moduleId}`, module)
      .pipe(catchError(this.errHandler.handleError));
  }
}
