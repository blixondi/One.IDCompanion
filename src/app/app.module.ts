import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//import service custom
import { LoginService } from './login.service';
import { PesertaService } from './peserta.service';

//import component baru
import { UpdatecoinComponent } from './updatecoin/updatecoin.component';
import { KatalogComponent } from './katalog/katalog.component';
import { RundownComponent } from './rundown/rundown.component';
import { PesertaHomeComponent } from './peserta-home/peserta-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';


const appRoutes: Routes = [
  { path: 'pesertaHome', component: PesertaHomeComponent },
  { path: 'adminHome', component: AdminHomeComponent },
  { path: 'rundown', component: RundownComponent },
  { path: 'katalog', component: KatalogComponent },
  { path: 'updateCoin', component: UpdatecoinComponent }
];

@NgModule({
  declarations: [AppComponent, UpdatecoinComponent, KatalogComponent, PesertaHomeComponent, AdminHomeComponent, RundownComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule, IonicStorageModule.forRoot(), RouterModule.forRoot(appRoutes), RouterModule.forChild(appRoutes)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, LoginService, PesertaService],
  bootstrap: [AppComponent],
})
export class AppModule { }
