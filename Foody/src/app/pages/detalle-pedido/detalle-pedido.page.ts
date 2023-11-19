import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';
import { PushNotificationService } from 'src/app/services/push-notifications.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {

  public productos : any;
  public price : any;

  constructor(private route : ActivatedRoute, private data : DataService, private navCTRL : NavController, private auth : AutheticationService, private push : PushNotificationService) {
    this.productos = this.route.snapshot.paramMap.get('productos');
   }

  ngOnInit() {
    this.data.getPedidoProductosByUserName(this.auth.userName).subscribe(pedido => 
    {
      this.productos = pedido;
      this.price = this.productos.reduce((total: any, pedido: { Price: any; }) => total + pedido.Price, 0);
    });
  }

  public async onCancelClick()
  {
    this.navCTRL.back();
  }

  public async onSaveClick()
  {
    const estadoPedido = {
      PedidoDe: this.auth.userName,
      Estado: 'solicitado',
      HoraSolicitado: new Date(),
      CocinaLista : false,
      BarListo : false
    }
    this.data.saveEstadoPedido(estadoPedido);
    this.auth.pedidoRealizado = true;
    this.navCTRL.back();
    this.sendPushNotification();
  }

  public async sendPushNotification() 
  {
    let mozosTokens = await this.data.getMozosTokens();
    console.log(mozosTokens);
    console.log('hola lol');
    this.push.sendPushNotification({
        registration_ids: mozosTokens,
        notification: {
          title: '¡Pedido solicitado!',
          body: `Tienes un nuevo pedido de la mesa #${this.auth.mesaAsignada}`,
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
