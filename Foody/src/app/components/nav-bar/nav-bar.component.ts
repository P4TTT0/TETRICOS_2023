import { Component, OnInit } from '@angular/core';
import { AutheticationService } from 'src/app/services/authetication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent  implements OnInit {

  // ||====|| Constructor ||====||
  constructor(public auth : AutheticationService) { }

  ngOnInit() {}

}
