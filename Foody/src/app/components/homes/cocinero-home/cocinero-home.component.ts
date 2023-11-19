import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cocinero-home',
  templateUrl: './cocinero-home.component.html',
  styleUrls: ['./cocinero-home.component.scss'],
})
export class CocineroHomeComponent  implements OnInit {

  mesas : any[];

  constructor(private data : DataService, private router : Router, private auth : AutheticationService) 
  {
    this.mesas = []
  }

  ngOnInit() 
  {
    this.data.getMesas().subscribe(mesas =>{
      this.mesas = mesas;
    })
  }

  asignarMesa(mesa : any)
  {
    
    console.log(mesa);
    this.router.navigate(['pedido', mesa])
  }

}
