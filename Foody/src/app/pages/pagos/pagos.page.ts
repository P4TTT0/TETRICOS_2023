import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

  public pagos : any;

  constructor(private navCtrl : NavController, private data : DataService) { }

  ngOnInit() 
  {
    this.data.getPedidosPorPagar().subscribe((x) =>
    {
      this.pagos = x;
    });
  }

  public async onBackClick()
  {
    this.navCtrl.back();
  }

  public async onAcceptClick(pedido : any)
  {
    await this.data.changeOrderStatus(pedido.name, 'pagado');
  }
 
}
