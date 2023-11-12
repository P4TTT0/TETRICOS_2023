import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.page.html',
  styleUrls: ['./lista-espera.page.scss'],
})
export class ListaEsperaPage implements OnInit {

  listaEspera : any;

  usersOnLocal : any;

  constructor(private data : DataService, private navCtrl : NavController, private auth : AutheticationService) { }

  async ngOnInit() {
    this.data.getUsersWaitingList().subscribe(users => 
      {
      this.listaEspera = users;
      console.log(this.listaEspera[0]);
    }) 
  }

  convertToPastTime(timestamp : any)
  {
    let segundosEnEspera = timestamp.seconds + timestamp.nanoseconds / 1e9
    let ahora = Date.now() / 1000;
    let minutosTranscurridos = Math.floor( (ahora - segundosEnEspera) / 60);


    if (minutosTranscurridos < 1) {
      return 'Hace unos segundos';
    } else if (minutosTranscurridos < 120) {
      return `Hace ${minutosTranscurridos} minutos`;
    } else {
      const horasTranscurridas = Math.floor(minutosTranscurridos / 60);
      return `Hace ${horasTranscurridas} horas`;
    }


    return ; 
  }

  public async onBackClick()
  {
    this.navCtrl.back();
  }
 
  onAssignClick(user : any, assigned : boolean)
  {
    this.data.UpdateWaitingUser(user.name,assigned);
  }

}
