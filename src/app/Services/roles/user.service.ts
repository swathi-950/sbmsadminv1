import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IpService } from '../ip.service';
import { ErrorHandlerService } from '../error-handler.service';
import { User, RoleList, permissionsList } from 'src/app/share/modal/modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private Ip = this.ip.ip;
  private user_port = this.ip.usermanagement_port;
  private baseUrl = "/rest/v1";
  private countriesUrl = "/locations";


  roleListById = new BehaviorSubject<RoleList>(null);
  copyEditUser = new Subject<User>();

  /* used in edit user edit */
  userList = new BehaviorSubject<User>(null);

  users_List = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient,
    private ip: IpService,
    private errHandler: ErrorHandlerService) { }

  createByUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.Ip}${this.user_port}${this.baseUrl}/users/create`, user).pipe(catchError(this.errHandler.handleError));
  }

  //Get all Countries
  getCountries(): Observable<any> {
    return this.http.get<any>(`${this.Ip}${this.user_port}${this.baseUrl}${this.countriesUrl}/countries`).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

  //Get states based on country id
  getStates(id: number): Observable<any> {
    return this.http.get<any>(`${this.Ip}${this.user_port}${this.baseUrl}${this.countriesUrl}/states/${id}`).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

  //Get cities based on state id
  getCities(id: number): Observable<any> {
    return this.http.get<any>(`${this.Ip}${this.user_port}${this.baseUrl}${this.countriesUrl}/cities/${id}`).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

  //Get Roles
  getRole(): Observable<any> {
    return this.http.get<any>(`${this.Ip}${this.user_port}${this.baseUrl}/roles`).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

  //Get USers
  getUsers() {
    return this.http.get<User[]>(`${this.Ip}${this.user_port}${this.baseUrl}/users`).pipe(
      map(res => {
        this.users_List.next(res);
        console.log("users_List", res);
        return res;
      }),
      (catchError(this.errHandler.handleError))
    );
  }

  //Edit user
  updateUsers(user: User, id: number) {
    return this.http.put<User>(`${this.Ip}${this.user_port}${this.baseUrl}/users/${id}`, user).pipe(
      catchError(this.errHandler.handleError)
    );
  }

  //Delete user
  deleteUsers(id: number) {
    return this.http.delete(`${this.Ip}${this.user_port}${this.baseUrl}/users/${id}`).pipe(
      map((res) => { this.getUsers().subscribe(); return res }),
      (catchError(this.errHandler.handleError))
    );
  }

  // Get roles based on id
  getRoleById(id: string) {
    return this.http.get<RoleList>(`${this.Ip}${this.user_port}${this.baseUrl}/roles/${id}`)
      .pipe(map(res => {
        this.roleListById.next(res);
        console.log("getRoleById", res);
        return res
      }), (catchError(this.errHandler.handleError)));
  }

  //Get User Permissions
  getUserPermissions(id: string): Observable<permissionsList> {
    return this.http.get<permissionsList>(`${this.Ip}${this.user_port}${this.baseUrl}/users/viewPermissions/${id}`).pipe(
      (catchError(this.errHandler.handleError))
    );
  }

}
