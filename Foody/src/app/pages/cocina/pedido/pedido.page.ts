import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
onBackClick() {
throw new Error('Method not implemented.');
}

  parametro : any = "";
  pedidos : any[];
  cliente : any;

  constructor(private activateRoute : ActivatedRoute, private data :DataService) 
  {
    this.pedidos = [];
  }

  async ngOnInit() 
  {
    this.parametro = this.activateRoute.snapshot.paramMap.get('parametro');

    this.cliente = await this.data.getUserFromMesa(this.parametro);
    this.pedidos = await this.data.getPedidosFromUser(this.cliente.name);
  }


}
