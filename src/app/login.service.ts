import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  checkLogin(username: string, password: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', password);
    return this.http.post(
      'https://noinheim.my.id/onedotid_api/login.php',
      body
    );
  }
  constructor(private http: HttpClient) {}
}
