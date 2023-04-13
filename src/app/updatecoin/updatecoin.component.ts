import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PesertaService } from '../peserta.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-updatecoin',
  templateUrl: './updatecoin.component.html',
  styleUrls: ['./updatecoin.component.scss'],
})
export class UpdatecoinComponent implements OnInit {

  constructor(private storage: Storage, public ps: PesertaService, public route: ActivatedRoute, public tc: ToastController) { }

  user_status = '';
  id = 0;
  nama_kelompok = '';


  koin_old = 0;
  koin_new = 0;

  koin1 = 0;
  koin5 = 0;
  koin10 = 0;

  perolehan_koin_old = 0;
  perolehan_koin_new = 0;

  diff_koin = 0;
  diff_perolehan = 0;

  reason = "";

  historys = [];

  addKoin() {
    this.koin_new += 1;
    this.perolehan_koin_new += 1;
    this.diff_koin = this.koin_new - this.koin_old;
  }

  remKoin() {
    this.koin_new -= 1;
    this.perolehan_koin_new -= 1;
    this.diff_koin = this.koin_new - this.koin_old;
  }


  insertHistory() {
    this.diff_koin = this.koin_new - this.koin_old;
    this.ps.insertHistory(this.id, this.diff_koin, this.reason).subscribe((data) => {
      if (data['result'] == "success") {
        this.reason = "";
        this.diff_perolehan = 0;
        this.diff_koin = 0;
        this.updateCoin();
      }
    })


  }

  async calculateCoin() {
    this.koin10 = Math.floor(this.koin_old / 10)
    let remaining = this.koin_old % 10

    this.koin5 = Math.floor(remaining / 5)
    remaining = remaining % 5

    this.koin1 = remaining
  }

  updateCoin() {
    this.diff_perolehan = this.koin_new - this.koin_old;

    if (this.diff_perolehan < 0) {
      this.diff_perolehan = 0;
    }
    this.ps.updateCoin(this.diff_perolehan, this.koin_new, this.id).subscribe((data) => {
      if (data['result'] == "success") {
        this.getDataKelompokById(this.id);
        this.getHistoryById(this.id);
        this.updateToast();
        this.calculateCoin()
      }
    })

  }

  getDataKelompokById(id: number) {
    this.ps.getDataKelompokById(id).subscribe((data) => {
      this.nama_kelompok = data['data']['0']['nama'];
      this.koin_old = data['data']['0']['koin'];
      this.koin_new = data['data']['0']['koin'];
      this.perolehan_koin_old = data['data']['0']['perolehan_koin'];
      this.perolehan_koin_new = data['data']['0']['perolehan_koin'];
      this.calculateCoin()
    });
    // this.calculateCoin()
  }

  getHistoryById(id: number) {
    this.ps.getHistoryKelompokById(id).subscribe((data) => {
      this.historys = data['data'];
    })
  }

  handlerMessage = '';

  public alertButtons = [
    {
      text: 'Tidak',
      role: 'cancel',
      handler: () => { }
    },
    {
      text: 'Ya',
      role: 'confirm',
      handler: () => { this.insertHistory(); }
    }
  ];



  async updateToast() {
    const toast = await this.tc.create({
      message: 'Update coin berhasil',
      duration: 1000,
      position: 'middle'
    });

    await toast.present();
  }

  async ngOnInit() {
    var kelompok_id: number = this.route.snapshot.params['id'];
    this.id = kelompok_id;
    this.user_status = await this.storage.get('user_status');
    this.getDataKelompokById(kelompok_id);
    this.getHistoryById(kelompok_id);
    // this.calculateCoin()
    console.log(this.koin_old)
  }


}
