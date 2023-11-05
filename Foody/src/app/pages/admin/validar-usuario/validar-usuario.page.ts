import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { UserInfoModalComponent } from 'src/app/components/homes/admin/user-info-modal/user-info-modal.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-validar-usuario',
  templateUrl: './validar-usuario.page.html',
  styleUrls: ['./validar-usuario.page.scss'],
})
export class ValidarUsuarioPage implements OnInit {

  public usersNotAccepted : any[] = [];
  constructor(public data : DataService, public modalController: ModalController, private router : Router, private navCtrl : NavController) { }

  async ngOnInit() 
  {
    this.usersNotAccepted = await this.data.GetUsersNotAccepted();
  }

  public async onUserClick(userName : string)
  {
    let user = await this.data.getUserByUserName(userName);

    console.log(user['id']);
    const modal = await this.modalController.create({
      component: UserInfoModalComponent,
      componentProps: {
        user: user,
      },
    });

    modal.onDidDismiss().then(async () => 
    {
      this.usersNotAccepted = await this.data.GetUsersNotAccepted();
    });
  
    await modal.present();
  }

  public async onBackClick()
  {
    this.navCtrl.back();
  }
}

