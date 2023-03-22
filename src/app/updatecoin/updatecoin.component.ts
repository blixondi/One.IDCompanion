import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-updatecoin',
  templateUrl: './updatecoin.component.html',
  styleUrls: ['./updatecoin.component.scss'],
})
export class UpdatecoinComponent implements OnInit {

  constructor(private storage: Storage) { }
  user_status = '';
  async ngOnInit() {
    this.user_status = await this.storage.get('user_status');
  }

}
