import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.page.html',
  styleUrls: ['./lista-espera.page.scss'],
})
export class ListaEsperaPage implements OnInit {

  listaEspera : any;

  constructor(private data : DataService) { }

  async ngOnInit() {

    this.data.getUsersWaitingList().subscribe(users => {
      this.listaEspera = users;
    })    
  }
}
