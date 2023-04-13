import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PesertaService {

  insertHistory(id: number, jumlah_transaksi: number, detail: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', id);
    body = body.set('jumlah_transaksi', jumlah_transaksi);
    body = body.set('detail', detail);
    return this.http.post(
      'https://noinheim.my.id/onedotid_api/inserthistory.php', body
    )
  }

  //get data kelompok untuk User
  getDataKelompok(id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', id);
    return this.http.post(
      'https://noinheim.my.id/onedotid_api/getkelompokbyuserid.php',
      body
    )
  }

  //get data kelompok untuk admin
  getDataKelompokById(id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', id);
    return this.http.post(
      'https://noinheim.my.id/onedotid_api/getkelompokbyid.php',
      body
    )
  }

  //get history kelompok untuk user
  getHistoryKelompok(id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', id);
    return this.http.post('https://noinheim.my.id/onedotid_api/gethistorykelompok.php', body)
  }

  //get history kelompok untuk admin
  getHistoryKelompokById(id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', id);
    return this.http.post('https://noinheim.my.id/onedotid_api/gethistorykelompokbyid.php', body)
  }

  updateCoin(perolehan_koin: number, koin: number, id: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('perolehan_koin', perolehan_koin);
    body = body.set('koin', koin);
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
