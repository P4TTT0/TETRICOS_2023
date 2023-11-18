import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cateogrys',
  templateUrl: './cateogrys.page.html',
  styleUrls: ['./cateogrys.page.scss'],
})
export class CateogrysPage implements OnInit {

  public products : any;
  public category : string = "";

  constructor(private navCtrl : NavController, private data : DataService, private route : ActivatedRoute, private router : Router) 
  {
    this.category = this.route.snapshot.paramMap.get('category') || '';
  }

  async ngOnInit() 
  {
    this.products = await this.data.getProductByCategory(this.category)
  }

  public async onBackClick()
  {
    this.navCtrl.back();
  }

  public onProductClick(product : string)
  {
    this.router.navigate(['product', product])
  }
}
