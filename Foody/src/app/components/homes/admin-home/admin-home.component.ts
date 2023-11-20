import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Firestore, collection, doc, docData, updateDoc, where, query, onSnapshot } from '@angular/fire/firestore';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';
import { PushNotificationService } from 'src/app/services/push-notifications.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent  implements OnInit {

  private lastDocument : any;
  private notificacionEnviada : boolean = false;

  constructor(private router : Router, private auth : AutheticationService, private push : PushNotificationService, private data : DataService, private firestore : Firestore, private navCtrl : NavController) { }

  ngOnInit() {
  }

  public async onValidateUserClick()
  {
    this.router.navigateByUrl('validar-usuario');
  }
  
}
