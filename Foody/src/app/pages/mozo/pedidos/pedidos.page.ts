import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { PedidosComponent } from 'src/app/components/pedidos/pedidos.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  public pedidos : any;

  constructor(private navCtrl : NavController, private data : DataService,private modalController : ModalController) {}

  async ngOnInit() {
    this.data.getPedidosSolicitados().subscribe((pedidos: any) => 
    {
      this.pedidos = pedidos;
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
 
  async onAssignClick(userName : any)
  {    
    let user = await this.data.getUserByUserName(userName);

    const modal = await this.modalController.create({
      component: PedidosComponent,
      componentProps: {
        user: user,
      },
    });

    await modal.present();
  }


}
