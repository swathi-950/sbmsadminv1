import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

import { ErrorHandlerService } from './error-handler.service';
import { AssetCategory, AssertType } from '../share/modal/modal';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root'
})

export class AssetService {

  private baseUrl = '/rest/v1/assetcategories';
  private assetType = '/rest/v1/assettypes'
  private asset_port = this.ip.asset_Port;

  copyEditAssertCategory = new Subject<AssetCategory>();
  assetCategoryList = new BehaviorSubject<AssetCategory[]>([]);
  copyEditAssertType = new Subject<AssertType>();
  assetTypeList = new BehaviorSubject<AssertType[]>([]);

  constructor(private ip: IpService,
    private http: HttpClient,
    private errHandler: ErrorHandlerService) { }

  /* create asset */
  createAssetCategory(categoty): Observable<AssetCategory> {
    console.log("categoty", categoty);
    return this.http.post(`${this.ip.ip}${this.ip.asset_Port}${this.baseUrl}`, categoty)
      .pipe(catchError(this.errHandler.handleError));
  }

  /* asset category list */
  getAssetCategoryList() {
    return this.http.get<AssetCategory[]>(`${this.ip.ip}${this.ip.asset_Port}${this.baseUrl}`)
      .pipe(map(res => {
        this.assetCategoryList.next(res);
        return res;
      }), catchError(this.errHandler.handleError));
  }

  /* Edit Category */
  editAssetCategory(categoty) {
    console.log("edit categoty", categoty);
    return this.http.put(`${this.ip.ip}${this.ip.asset_Port}${this.baseUrl}/${categoty.assetCategoryId}`, categoty)
      .pipe(catchError(this.errHandler.handleError));
  }

  /* Delete asset category */
  deleteAssetCategory(id) {
    return this.http.delete(`${this.ip.ip}${this.ip.asset_Port}${this.baseUrl}/${id}`)
      .pipe(catchError(this.errHandler.handleError));
  }

  /* Asset Type List */
  getAssetTypeList() {
    return this.http.get<AssertType[]>(`${this.ip.ip}${this.asset_port}${this.assetType}`)
      .pipe(map(res => {
        this.assetTypeList.next(res);
        return res;
      }), catchError(this.errHandler.handleError));
  }

  /* Create asset type */
  createAssetType(assetType: AssertType): Observable<AssertType> {
    console.log(assetType);
    return this.http.post<AssertType>(`${this.ip.ip}${this.asset_port}${this.assetType}`, assetType)
      .pipe(catchError(this.errHandler.handleError));
  }

  /* Edit asset Type */
  editAssetType(type: AssertType) {
    return this.http.put(`${this.ip.ip}${this.asset_port}${this.assetType}/${type.assetTypeId}`, type)
      .pipe(catchError(this.errHandler.handleError));
  }

  /* Delete Asset type */
  deleteAssetType(id) {
    return this.http.delete(`${this.ip.ip}${this.asset_port}${this.assetType}/${id}`)
      .pipe(catchError(this.errHandler.handleError));
  }
}