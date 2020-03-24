import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ErrorHandlerService } from './error-handler.service';
import { IpService } from './ip.service';
import { Encode_Permission } from '../share/encode_permissions';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  authenticatedUser: any;
  islogin: boolean = false;
  userName = new BehaviorSubject<string>(null);
  roleName = new BehaviorSubject<string>(null);
  token: string = localStorage.getItem('token') || null;
  refresh_Token = null;
  decoded: any;
  spiner = new BehaviorSubject(false);
  permissions = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient,
    private errHandler: ErrorHandlerService,
    private ip: IpService,
    private router: Router) {
    this.decodeToken();
  }

  getJwtToken(): string {
    return this.token;
  }

  refreshToken(): Observable<any> {
    return this.http.get<any>(`${this.ip.ip}${this.ip.login_Port}/rest/v1/login/generateToken/${this.decoded.sub}`).pipe(take(1), tap(res => {
      // console.log(res);
      if (res) {
        this.refresh_Token = res['jwtToken'];
        // console.log("refresh token",this.refresh_Token);
        if (this.refresh_Token) {
          localStorage.setItem('token', this.refresh_Token);
          this.token = this.refresh_Token;
        }
      }
    }));
  }

  decodeToken(): boolean {
    try {
      if (this.token != null && this.token != undefined && this.token.length != 0) {
        this.decoded = jwt_decode(this.token);
        this.userName.next(this.decoded.sub);
        console.log(this.decoded);
        try {
          let encode = new Encode_Permission(JSON.parse(localStorage.getItem('permissions')));
          const decoded_permission = encode.decoded();
          this.permissions.next(decoded_permission);
        } catch (error) {
          this.logout();
          this.router.navigate(['/signIn']);
        }
        return true;
      }
      else
        return false;
    } catch (error) {
      this.logout();
      this.router.navigate(['/signIn']);
    }

  }

  authenticate(loginId: string, password: string) {
    return this.http.post(`${this.ip.ip}${this.ip.login_Port}/rest/v1/login/signin`, { loginId, password }).pipe(map(res => {
      if (res) {
        console.log(res);
        this.token = res['jwtToken'];
        this.roleName.next(res['role']);
        const permissions = res['permissions'];
        localStorage.setItem('token', this.token);
        let encode = new Encode_Permission(permissions);
        localStorage.setItem('permissions', JSON.stringify(encode.encode()));;
        this.decodeToken();
        return true;
      }
      else
        return false;
    }), catchError(this.errHandler.handleError));
  }

  logout() {
    this.remove_localStorage();
    this.token = null;
    this.islogin = false;
    this.router.navigate(['/signIn']);
  }

  private remove_localStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
  }

}
