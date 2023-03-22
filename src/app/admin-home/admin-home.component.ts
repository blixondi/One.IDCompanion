import { Component, OnInit } from '@angular/core';
import { PesertaService } from '../peserta.service';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {

  constructor(public ps: PesertaService) { }

  kelompoks: any = [];

  // daftarKelompok() {
  //   this.ps.getAllKelompok().subscribe((data) => {
  //     this.kelompoks = data;
  //   })
  // }

  daftarKelompok() {
    this.ps.getAllKelompok().subscribe((data) => {
      if (Array.isArray(data)) {
        this.kelompoks = data;
      } else {
        this.kelompoks = [data];
      }
    });
  }


  ngOnInit() {
    this.daftarKelompok();
  }

}
