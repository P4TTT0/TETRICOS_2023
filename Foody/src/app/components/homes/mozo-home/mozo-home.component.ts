import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mozo-home',
  templateUrl: './mozo-home.component.html',
  styleUrls: ['./mozo-home.component.scss'],
})
export class MozoHomeComponent  implements OnInit {


  constructor(private router : Router) { }

  ngOnInit() {}

  public onPedidosClick()
  {
    this.router.navigateByUrl('pedidos');
  }

  onPedidosAceptadosClick() 
  {
    this.router.navigateByUrl('pedidosAceptados');
  }
}
