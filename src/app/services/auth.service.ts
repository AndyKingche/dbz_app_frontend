import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL_Login = environment.url+'api/v1/';
  URL_User = environment.url+'api/v1/user';
  

  constructor(private http: HttpClient, private cookies: CookieService, private route_navigate : Router) { }

  loginUser(login:any):Observable<any>{
    return this.http.post(`${this.URL_Login}authenticate`,login);
  }

  logOutUser(): void{
    this.deleteToken();
    this.deleteUsername();
    this.route_navigate.navigate(['/authentication/side-login'])
  }

  setToken(token: any): void{
    this.cookies.set('token', token,{ expires:1, path: '/', secure:false });
  }

  setUsername(fullName: any): void{
    localStorage.setItem('name', fullName)
  }

  getToken(){
    return this.cookies.get('token');
  }

  getUsername(){
    return localStorage.getItem('name');
  }

  deleteToken(): void{
    this.cookies.delete('token', '/');
  }

  deleteUsername(): void{
    localStorage.clear();
  }

  async checkRolUser(username: string, spinner: NgxSpinnerService) {
    try {

      const USER_ROL : any = await firstValueFrom(
        this.http.get(`${this.URL_User}/${username}`)
      );

      localStorage.setItem('1',USER_ROL.role.id);
      
      if(USER_ROL.role.id == 1){ 
        this.setUsername(USER_ROL.userName+' '+USER_ROL.userLastname);
        spinner.hide();
        this.route_navigate.navigate(['/dashboard/admin']);
      }
      if(USER_ROL.role.id == 2){ 
        this.setUsername(USER_ROL.userName+' '+USER_ROL.userLastname);
        spinner.hide();
        this.route_navigate.navigate(['/starter']);
      }
      
    } catch (error) {
      spinner.hide();
      throw error;
    }
  }
}

