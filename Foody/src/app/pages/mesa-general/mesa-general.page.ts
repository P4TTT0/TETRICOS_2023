import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesa-general',
  templateUrl: './mesa-general.page.html',
  styleUrls: ['./mesa-general.page.scss'],
})
export class MesaGeneralPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  onChatClick()
  {
    this.router.navigateByUrl('chat-mozo');
  }

  onMenuClick()
  {
    this.router.navigateByUrl('mesa');
  }

}
