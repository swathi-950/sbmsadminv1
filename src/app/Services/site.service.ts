import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Sites, SiteArchitecture, SiteRequriment } from '../share/modal/modal';
import { IpService } from './ip.service';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private site_port = this.ip.site_port;
  private sites = '/rest/v1';

  siteList = new BehaviorSubject<Sites[]>([]);
  copy_site = new BehaviorSubject<Sites>(null);
  copyEditSite = new Subject<Sites>();

  constructor(private http: HttpClient,
    private ip: IpService,
    private errHandler: ErrorHandlerService) { }

  // Save site
  siteCreate(sites: Sites): Observable<Sites> {
    console.log(sites);
    return this.http.post<Sites>(`${this.ip.ip}${this.site_port}${this.sites}/sites`, sites).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

  // Get all Countries
  getCountries(): Observable<any> {
    return this.http.get<any>(`${this.ip.ip}${this.site_port}${this.sites}/locations/countries`).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

  // Get states based on country id
  getStates(country_id: number): Observable<any> {
    return this.http.get<any>(`${this.ip.ip}${this.site_port}${this.sites}/locations/states/${country_id}`).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

  // Get cities based on state id
  getCities(state_id: number): Observable<any> {
    return this.http.get<any>(`${this.ip.ip}${this.site_port}${this.sites}/locations/cities/${state_id}`).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

  // Get all Sites
  getSities(): Observable<Sites[]> {
    return this.http.get<Sites[]>(`${this.ip.ip}${this.site_port}${this.sites}/sites`).pipe(map(res => {
      if (res != null) {
        this.siteList.next(res);
      }
      return res;
    }), catchError(this.errHandler.handleError));

  }

  // Delete Site
  deleteSite(id: number) {
    return this.http.delete(`${this.ip.ip}${this.site_port}${this.sites}/sites/${id}`).pipe(map(() => {
      this.getSities().subscribe();
    }), catchError(this.errHandler.handleError));
  }

  // Update Site
  updateSite(sites: Sites, id: number) {
    console.log(id);
    return this.http.put(`${this.ip.ip}${this.site_port}${this.sites}/sites/${id}`, sites).pipe(map(res => {
      this.getSities().subscribe();
      return res;
    }), catchError(this.errHandler.handleError));
  }

  // SiteReq Creation
  siteReq(sitereq: SiteRequriment): Observable<SiteRequriment> {
    return this.http.post<SiteRequriment>(`${this.ip.ip}${this.site_port}${this.sites}/sites/siteReq`, sitereq).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

  // SiteArc Creation
  createSiteArc(sitearc: SiteArchitecture): Observable<SiteArchitecture> {
    return this.http.post<SiteArchitecture>(`${this.ip.ip}${this.ip.site_port}/rest/v1/sites/siteArc`, sitearc).pipe(
      (catchError(this.errHandler.handleError))
    );
  }


}
