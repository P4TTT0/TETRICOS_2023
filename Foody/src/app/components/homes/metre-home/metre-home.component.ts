import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metre-home',
  templateUrl: './metre-home.component.html',
  styleUrls: ['./metre-home.component.scss'],
})
export class MetreHomeComponent  implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {}

  public async onWaitingListClick()
  {
    this.router.navigateByUrl('lista-espera');
  }

}
