import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mi-pedido',
  templateUrl: './mi-pedido.page.html',
  styleUrls: ['./mi-pedido.page.scss'],
})
export class MiPedidoPage implements OnInit {

  public pedido : any;

  constructor(private data : DataService, private modalController : ModalController, private auth : AutheticationService) { }

  async ngOnInit() 
  {
    this.data.getEstadoPedidoByUsername2(this.auth.userName).subscribe(pedido => 
    {
      console.log(pedido);
      this.pedido = pedido[0];
    });
  }

  public async onDecideClick(validated : boolean | null)
  {
    if(validated != null)
    {
      this.data.changeOrderStatus(this.auth.userName,'Entregado')
    }

    this.modalController.dismiss();
  }
}


