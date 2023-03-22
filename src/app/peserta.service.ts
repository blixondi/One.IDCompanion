import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PesertaService {

  getDataKelompok(id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', id);
    return this.http.post(
      'https://noinheim.my.id/onedotid_api/getkelompokbyid.php',
      body
    )
  }

  getFavoriteComic(user_id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', user_id);
    return this.http.post(
      'https://ubaya.fun/hybrid/160420033/komik_api/getuserfavcomic.php',
      body
    )
  }

  constructor(private http: HttpClient) { }
}
