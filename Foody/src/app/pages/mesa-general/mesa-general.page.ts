import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mesa-general',
  templateUrl: './mesa-general.page.html',
  styleUrls: ['./mesa-general.page.scss'],
})
export class MesaGeneralPage implements OnInit {

  user : any;
  orderStatus : any;
  firstButtonMessage = "Menú";

  constructor(private auth : AutheticationService, private router : Router, private data : DataService) { }

  async ngOnInit() 
  {
    this.data.getOrderStatusByUsername(this.auth.userName).subscribe(status =>
    {
      this.orderStatus = status[0].orderStatus

      if(this.orderStatus == 'SinPedir')
    {
      this.firstButtonMessage = 'MENÚ';
    }
    else
    {
      if(this.orderStatus == 'EnEspera')
      {
        this.firstButtonMessage = 'ESTADO DEL PEDIDO';
      }
      else
      {
        this.firstButtonMessage = 'PEDIR LA CUENTA';
      }
    }
    })

    
    
  }

  onChatClick()
  {
    this.router.navigate(['chat-mozo', 1]);
  }

  onMenuClick()
  {
    switch(this.orderStatus)
    {
      case 'SinPedir':
        this.router.navigateByUrl('mesa');
        break;
      case 'EnEspera':
        this.router.navigateByUrl('MiPedido');
        break;
      case 'Entregado':
        this.router.navigateByUrl('Cuenta');
    }
  }

}
