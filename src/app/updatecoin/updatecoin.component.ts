import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PesertaService } from '../peserta.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-updatecoin',
  templateUrl: './updatecoin.component.html',
  styleUrls: ['./updatecoin.component.scss'],
})
export class UpdatecoinComponent implements OnInit {

  constructor(private storage: Storage, public ps: PesertaService, public route: ActivatedRoute) { }

  user_status = '';
  nama_kelompok = '';
  koin1_old = 0;
  koin5_old = 0;
  koin10_old = 0;
  total_koin_old = 0;
  id = 0;

  koin1_new = 0;
  koin5_new = 0;
  koin10_new = 0;
  reason = "";

  diff_koin1 = 0;
  diff_koin5 = 0;
  diff_koin10 = 0;

  historys = [];

  addKoin1() {
    this.koin1_new += 1;
  }

  remKoin1() {
    this.koin1_new -= 1;
  }

  addKoin5() {
    this.koin5_new += 1;
  }

  remKoin5() {
    this.koin5_new -= 1;
  }

  addKoin10() {
    this.koin10_new += 1;
  }

  remKoin10() {
    this.koin10_new -= 1;
  }

  insertHistory() {
    this.diff_koin1 = this.koin1_new - this.koin1_old;
    this.diff_koin5 = this.koin5_new - this.koin5_old;
    this.diff_koin10 = this.koin10_new - this.koin10_old;
    this.ps.insertHistory(this.id, this.diff_koin1, this.diff_koin5, this.diff_koin10, this.reason).subscribe((data) => {
      if (data['result'] == "success") {
        this.reason = "";
        this.updateCoin();
      }
    })
  }

  updateCoin() {
    this.ps.updateCoin(this.koin1_new, this.koin5_new, this.koin10_new, this.id).subscribe((data) => {
      if (data['result'] == "success") {
        this.getDataKelompokById(this.id);
      }
    })
  }

  getDataKelompokById(id: number) {
    this.ps.getDataKelompokById(id).subscribe((data) => {
      this.nama_kelompok = data['data']['0']['nama'];
      this.koin1_old = data['data']['0']['koin1'];
      this.koin5_old = data['data']['0']['koin5'];
      this.koin10_old = data['data']['0']['koin10'];
      this.total_koin_old = data['data']['0']['total_koin'];
    });
  }

  async ngOnInit() {
    var kelompok_id: number = this.route.snapshot.params['id'];
    this.id = kelompok_id;
    this.user_status = await this.storage.get('user_status');
    this.getDataKelompokById(kelompok_id);
  }

}
