import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.page.html',
  styleUrls: ['./mesa.page.scss'],
})
export class MesaPage implements OnInit {
  categorys : any;
  pedido : any;
  precioTotal! : number;
  pedidoRealizado : boolean = false;

  constructor(private data : DataService, private navCtrl : NavController, private router : Router, public auth : AutheticationService) { }

  async ngOnInit() 
  {
    this.categorys = await this.data.getCategorys();
    console.log(this.categorys);
    this.data.getPedidoProductosByUserName('pedro').subscribe(pedido => 
    {
      this.pedido = pedido;
      this.precioTotal = this.pedido.reduce((total: any, pedido: { Price: any; }) => total + pedido.Price, 0);
    });
  }

  public async onBackClick()
  {
    this.router.navigateByUrl('home');
  }

  public onCategoryClick(category : string)
  {
    this.router.navigate(['categorys', category])
  }

  public onPayClick()
  {
    this.router.navigate(['detalle', this.pedido]);
  }

}
