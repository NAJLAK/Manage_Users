import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
 import  {HttpUsersListResponse,UserType} from "src/app/types/user.type";
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public perPage = 6;

  getUsers(page: number): Observable<HttpUsersListResponse> {
    return this.http.get(`${environment.apiLink}/users?page=${page}`) as Observable<HttpUsersListResponse>;
  }

  addUser(user: UserType): Observable<any> {
    return this.http.post(`${environment.apiLink}/users`, user);
  }

  updateUser(id: number, updatedUser: Partial<UserType>): Observable<any> {
    return this.http.put(`${environment.apiLink}/users/${id}`, updatedUser);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${environment.apiLink}/users/${id}`);
  }
}
