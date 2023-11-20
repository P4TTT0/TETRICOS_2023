import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';
import { PushNotificationService } from 'src/app/services/push-notifications.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit 
{

onBackClick() {
  this.navCtrl.back();
}


  parametro : any = "";
  pedidos : any[];
  cliente : any;

  constructor(private activateRoute : ActivatedRoute, private data :DataService, private auth : AutheticationService, private push : PushNotificationService, private navCtrl : NavController) 
  {
    this.pedidos = [];
  }

  async ngOnInit() 
  {
    this.parametro = this.activateRoute.snapshot.paramMap.get('parametro');

    this.cliente = await this.data.getUserFromMesa(this.parametro);

    let sector = 'Cocina'
    if(this.auth.rol != 'Cocinero')
    {
      sector = 'Bar'
    }

    this.pedidos = await this.data.getPedidosFromUser(this.cliente.name, sector);
  }

  pedidoListo() 
  {

    let sectorAModificar = 'CocinaLista'
    let sector = '¡Cocina lista!' 

    if(this.auth.rol != 'Cocinero')
    {
      sectorAModificar = 'BarListo'
      sector = '¡Bar listo!'
    }

    this.data.updateEstadoSectorByUserName(this.cliente.name, sectorAModificar);
    this.sendPushNotification(sector);
    this.pedidos = [];


  }


  public async sendPushNotification(sector : string) 
  {
    let mozosTokens = await this.data.getMozosTokens();
    console.log(mozosTokens);
    console.log('hola lol');
    this.push.sendPushNotification({
        registration_ids: mozosTokens,
        notification: {
          title: sector,
          body: `El cocinero ha terminado el pedido de la mesa #${this.parametro}`,
        },
        data: {
          do: 'navigate',
          value: 
          {
            url: 'pedidos'
          }
        },
      })
      .subscribe((data) => {
        console.log('hola sas' + data);
      });
  }


}
