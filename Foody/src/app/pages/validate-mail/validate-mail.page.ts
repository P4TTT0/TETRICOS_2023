import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validate-mail',
  templateUrl: './validate-mail.page.html',
  styleUrls: ['./validate-mail.page.scss'],
})
export class ValidateMailPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  public onLoginClick()
  {
    this.router.navigateByUrl('login');
  }

}
