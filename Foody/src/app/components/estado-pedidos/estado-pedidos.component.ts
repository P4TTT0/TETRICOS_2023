import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-estado-pedidos',
  templateUrl: './estado-pedidos.component.html',
  styleUrls: ['./estado-pedidos.component.scss'],
})
export class EstadoPedidosComponent  implements OnInit {

  @Input() user : any;
  public pedido : any;

  constructor(private data : DataService, private modalController : ModalController, private auth : AutheticationService) { }

  async ngOnInit() 
  {
    console.log(this.user);
    this.data.getEstadoPedidoByUsername(this.user.UserName).subscribe(pedido => 
    {
      console.log(this.user);
      this.pedido = pedido[0];
      console.log(pedido);
    });
  }

  public async onDecideClick(validated : boolean | null)
  {
    if(validated != null)
    {
      await this.data.entregarPedidoByUserName(this.user.UserName);
    }

    this.modalController.dismiss();
  }
}
