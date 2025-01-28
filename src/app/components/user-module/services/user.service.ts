import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Messages } from 'src/app/models/response/messages';
import { UsUser } from 'src/app/models/user-module/us-user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL_User = environment.url+'api/v1/user/';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UsUser[]> {
    return this.http.get<UsUser[]>(`${this.URL_User}list-user`);
  }

  getUserById(id: number) {
    return this.http.get(`${this.URL_User}user/${id}`);
  }

  createUser(user: UsUser): Observable<Messages> {
    return this.http.post<Messages>(`${this.URL_User}create-user`, user);
  }

  updateUser(id: number, user: UsUser): Observable<Messages> {
    return this.http.put<Messages>(`${this.URL_User}user-edit/${id}`, user);
  }

  deleteUser(id: number): Observable<Messages> {
    return this.http.delete<Messages>(`${this.URL_User}user-delete/${id}`);
  }

  getUserByEmail(email: string): Observable<UsUser> {
    return this.http.get<UsUser>(`${this.URL_User}${email}`);
  }
}
