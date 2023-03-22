import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PesertaService {

  insertHistory(id: number, koin1: number, koin5: number, koin10: number, detail: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', id);
    body = body.set('koin1', koin1);
    body = body.set('koin5', koin5);
    body = body.set('koin10', koin10);
    body = body.set('detail', detail);
    return this.http.post(
      'https://noinheim.my.id/onedotid_api/inserthistory.php', body
    )
  }

  getDataKelompok(id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', id);
    return this.http.post(
      'https://noinheim.my.id/onedotid_api/getkelompokbyuserid.php',
      body
    )
  }

  getDataKelompokById(id: number): Observable<any> {
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

  getAllKelompok(): Observable<any> {
    return this.http.get('https://noinheim.my.id/onedotid_api/getkelompok.php')
  }

  constructor(private http: HttpClient) { }
}
