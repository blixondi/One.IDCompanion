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

  updateCoin(koin1: number, koin5: number, koin10: number, id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('koin1', koin1);
    body = body.set('koin5', koin5);
    body = body.set('koin10', koin10);
    body = body.set('id', id);
    return this.http.post(
      'https://noinheim.my.id/onedotid_api/updatecoin.php', body
    )
  }

  constructor(private http: HttpClient) { }
}
