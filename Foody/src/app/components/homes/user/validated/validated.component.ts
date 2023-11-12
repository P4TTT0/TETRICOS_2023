import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-validated',
  templateUrl: './validated.component.html',
  styleUrls: ['./validated.component.scss'],
})
export class ValidatedComponent  implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {}

  ingresarLocal()
  {
    
  }

  public async onBackClick()
  {
    this.navCtrl.back();
  }
}
