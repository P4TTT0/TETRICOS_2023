import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-asignar-mesa',
  templateUrl: './asignar-mesa.component.html',
  styleUrls: ['./asignar-mesa.component.scss'],
})
export class AsignarMesaComponent implements OnInit {
  @Input() user: any;
  mesas: any;

  constructor(private modalController: ModalController, private data: DataService) {}

  ngOnInit() {
    this.data.getMesas().subscribe(mesas => {
      this.mesas = mesas;
    });
  }

  async asignarMesa(numeroMesa : any) {
    if(numeroMesa != null)
    {
      await this.data.setMesa(this.user.name, numeroMesa);  
      await this.data.UpdateWaitingUser(this.user.name, true);    
    }
    this.modalController.dismiss();
  }
}
