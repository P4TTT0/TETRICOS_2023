import { Component } from '@angular/core';
import { AutheticationService } from '../services/authetication.service';
import { PushNotificationService } from '../services/push-notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usingQR : boolean = false;

  constructor(public auth : AutheticationService, private push : PushNotificationService) 
  {
    this.push.getUser();
  }

  onUsingQRChange(newValue: boolean) {
    this.usingQR = newValue;
  }

}
