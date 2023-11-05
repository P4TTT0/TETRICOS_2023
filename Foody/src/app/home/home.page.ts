import { Component } from '@angular/core';
import { AutheticationService } from '../services/authetication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public auth : AutheticationService) {}

}
