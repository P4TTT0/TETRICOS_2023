import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.page.html',
  styleUrls: ['./mesa.page.scss'],
})
export class MesaPage implements OnInit {
  categorys : any;

  constructor(private data : DataService, private navCtrl : NavController, private router : Router) { }

  async ngOnInit() 
  {
    this.categorys = await this.data.getCategorys();
    console.log(this.categorys);
  }

  public async onBackClick()
  {
    this.navCtrl.back();
  }

  public onCategoryClick(category : string)
  {
    this.router.navigate(['categorys', category])
  }

}
