import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IpService } from '../ip.service';
import { Packs } from 'src/app/share/modal/modal';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PackService {
  private Ip = this.ip.ip;
  private pack_port = this.ip.pack_port;
  private baseUrl = "/rest/v1/pack";

  packs_List = new BehaviorSubject<Packs[]>([]);
  copyEditPackList = new Subject<Packs>();

  constructor(private http: HttpClient,
    private ip: IpService,
    private errHandler: ErrorHandlerService) { }

  //CreatePack

  packCreate(pack: Packs): Observable<Packs> {
    return this.http.post<Packs>(`${this.Ip}${this.pack_port}${this.baseUrl}/create`, pack)
      .pipe(catchError(this.errHandler.handleError));
  }

  // list of packs
  getPacks() {
    return this.http.get<Packs[]>(`${this.Ip}${this.pack_port}${this.baseUrl}`)
      .pipe(
        map(res => {
          this.packs_List.next(res);
          console.log("packs_List", res);
          return res;
        }),
        (catchError(this.errHandler.handleError))
      );
  }

  //delete pack
  packDelete(id) {
    return this.http.delete(`${this.Ip}${this.pack_port}${this.baseUrl}/${id}`).pipe(
      map((res) => {
        this.getPacks().subscribe();
        return res
      }),
      (catchError(this.errHandler.handleError))
    );
  }

  //edit pack

  editPack(pack: Packs) {
    return this.http.put(`${this.Ip}${this.pack_port}${this.baseUrl}/${pack.id}`, pack)
      .pipe(catchError(this.errHandler.handleError));
  }

}
