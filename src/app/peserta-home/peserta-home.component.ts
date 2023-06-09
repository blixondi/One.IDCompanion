import { Component, OnInit } from '@angular/core';
import { PesertaService } from '../peserta.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-peserta-home',
  templateUrl: './peserta-home.component.html',
  styleUrls: ['./peserta-home.component.scss'],
})
export class PesertaHomeComponent implements OnInit {

  constructor(public ps: PesertaService, private storage: Storage) { }

  id = 0;
  kelompok_id = 0;
  nama_kelompok = '';
  koin = 0;
  perolehan_koin = 0;

  koin1 = 0
  koin5 = 0
  koin10 = 0
  total_koin = 0;

  historys = [];

  status = ''

  getDataKelompok(id: number) {
    this.ps.getDataKelompok(id).subscribe((data) => {

      this.nama_kelompok = data['data']['0']['nama'];
      this.koin = data['data']['0']['koin'];
      this.perolehan_koin = data['data']['0']['perolehan_koin'];
      this.kelompok_id = data['data']['0']['id'];
      this.calculateCoin()
    });
  }

  getHistoryKelompok(id: number) {
    this.ps.getHistoryKelompok(id).subscribe((data) => {
      this.historys = data['data'];
    })
  }

  async ngOnInit() {
    this.id = await this.storage.get('user_id');
    this.getDataKelompok(this.id);
    this.getHistoryKelompok(this.id);
  }

  async calculateCoin() {
    this.koin10 = Math.floor(this.koin / 10)
    let remaining = this.koin % 10

    this.koin5 = Math.floor(remaining / 5)
    remaining = remaining % 5

    this.koin1 = remaining
  }

}
