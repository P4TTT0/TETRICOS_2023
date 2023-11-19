import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';
import { PushNotificationService } from 'src/app/services/push-notifications.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent  implements OnInit {

  @Input() user : any;
  public productos : any;

  constructor(private data : DataService, private modalController : ModalController, private auth : AutheticationService, private push : PushNotificationService) { }

  async ngOnInit() 
  {
    console.log(this.user);
    this.data.getPedidoProductosByUserName(this.user.UserName).subscribe(pedido => 
    {
      this.productos = pedido;
      console.log(pedido);
    });
  }

  public async onDecideClick(validated : boolean | null)
  {
    if(validated != null)
    {
      await this.data.updateEstadoPedidoByUserName(this.user.UserName);
      this.sendPushNotification();
    }

    this.modalController.dismiss();
  }

  public async sendPushNotification() 
  {
    let mozosTokens = await this.data.getCocineroBaristasTokens();
    console.log('hola lol');
    this.push.sendPushNotification({
        registration_ids: mozosTokens,
        notification: {
          title: '¡Nuevo pedido!',
          body: `Tienes un nuevo pedido a realizar.`,
        },
      })
      .subscribe((data) => {
        console.log('hola sas' + data);
      });
  }
}
