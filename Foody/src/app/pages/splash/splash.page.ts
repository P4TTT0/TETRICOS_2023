import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router : Router) { }

  async ngOnInit() {
    setTimeout(async () => {
      this.router.navigate(["/login"]);
    }, 2000);
  }

}
