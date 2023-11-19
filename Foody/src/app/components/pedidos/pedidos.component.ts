import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent  implements OnInit {

  @Input() user : any;
  public productos : any;

  constructor(private data : DataService, private modalController : ModalController, private auth : AutheticationService) { }

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
      this.data.changeOrderStatus(this.user.UserName,'EnEspera')
    }

    this.modalController.dismiss();
  }
}
