import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-no-validated',
  templateUrl: './no-validated.component.html',
  styleUrls: ['./no-validated.component.scss'],
})
export class NoValidatedComponent  implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {}

  public async onBackClick()
  {
    this.navCtrl.back();
  }

}
