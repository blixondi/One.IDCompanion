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
  nama_kelompok = '';
  koin1 = '';
  koin5 = '';
  koin10 = '';
  total_koin = 0;

  status = ''

  getDataKelompok(id: number) {
    this.ps.getDataKelompok(id).subscribe((data) => {
      
      this.nama_kelompok = data['data']['0']['nama'];
      this.koin1 = data['data']['0']['koin1'];
      this.koin5 = data['data']['0']['koin5'];
      this.koin10 = data['data']['0']['koin10'];
      this.total_koin = data['data']['0']['total_koin'];
    });
  }

  async ngOnInit() {
    this.id = await this.storage.get('user_id');
    this.getDataKelompok(this.id);
  }

}
