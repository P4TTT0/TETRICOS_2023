import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheticationService } from 'src/app/services/authetication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent  implements OnInit {

  // ||====|| Constructor ||====||
  constructor(public auth: AutheticationService,
              private router: Router) { }

  ngOnInit() {}

  async logout()
  {
    await this.auth.logOut();
    this.router.navigateByUrl('login');
  }
}
