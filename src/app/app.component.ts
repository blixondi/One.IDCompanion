import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { LoginService } from './login.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage: Storage, public ls: LoginService, public tc: ToastController) { }
  user_id = '';
  username = '';
  user_status = '';
  login_user = '';
  login_pw = '';

  async wrongToast() {
    const toast = await this.tc.create({
      message: 'Wrong username/password',
      duration: 1500,
      position: 'top'
    });

    await toast.present();

  }

  async rightToast(username: string) {
    const toast = await this.tc.create({
      message: 'Hello ' + username + ', welcome to One.ID Companion APP',
      duration: 1500,
      position: 'top'
    });
    await toast.present();
  }

  login() {
    this.ls.checkLogin(this.login_user, this.login_pw).subscribe((data) => {
      if (data['result'] == 'success') {
        this.user_id = data['id'];
        this.username = data['username'];
        this.user_status = data['status'];
        this.storage.set('username', this.username);
        this.storage.set('user_id', this.user_id);
        this.storage.set('user_status', this.user_status);
        this.login_pw = '';
        this.login_user = '';
        this.rightToast(this.username);
      } else {
        this.wrongToast();
      }
    })
  }

  logout() {
    this.user_id = '';
    this.storage.remove('username');
    this.storage.remove('user_id');
    this.storage.remove('user_status');
  }

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
    this.user_id = await this.storage.get('user_id');
    this.user_status = await this.storage.get('user_status');
  }
}
