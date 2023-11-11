import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent  implements OnInit {

  constructor(private router : Router, private navCtrl : NavController) { }

  ngOnInit() {}

  public async onValidateUserClick()
  {
    this.router.navigateByUrl('validar-usuario');
  }

  public async onBackClick()
  {
    this.navCtrl.back();
  }
}
