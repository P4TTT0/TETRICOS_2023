import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  public productName : any;
  public product : any;
  public cantidad : number = 1;
  public originalPrice! : number;
  public price! : number;

  constructor(private navCtrl : NavController, private route : ActivatedRoute, private data : DataService, private router : Router) 
  {
    this.productName = this.route.snapshot.paramMap.get('product');
  }

  async ngOnInit() 
  {
    this.product = await this.data.getProductByProductName(this.productName);
    this.originalPrice = this.product.Price;
    this.price = this.product.Price;
  }

  public async onBackClick()
  {
    this.navCtrl.back();
  }

  onMinusClick()
  {
    if(this.cantidad > 1)
    {
      this.cantidad--;
      this.price = this.price - this.originalPrice;
    }
  }
  onPlusClick()
  {
    this.cantidad++;
    this.price = this.price + this.originalPrice;
  }

  onCancelClick()
  {
    this.navCtrl.back();
  }

}
