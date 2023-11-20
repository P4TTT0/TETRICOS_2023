import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.page.html',
  styleUrls: ['./alta-producto.page.scss'],
})
export class AltaProductoPage implements OnInit {

  public form : FormGroup;
  
  constructor(private formBuilder : FormBuilder, private data : DataService) { 
    this.form = this.formBuilder.group({
      category: ['',[Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      estimatedTime: ['', [Validators.required]],
      price: ['', [Validators.required,]],
      sector: ['', [Validators.required]],
      photo1: ['', [Validators.required]],
      photo2: ['', [Validators.required]],
      photo3: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  public async onGuardarClick()
  {
    const producto = {
      Category: this.form.controls['category'].value,
      Description: this.form.controls['description'].value,
      EstimatedTime: this.form.controls['estimatedTime'].value,
      Image1: this.form.controls['photo1'].value,
      Image2: this.form.controls['photo2'].value,
      Image3: this.form.controls['photo3'].value,
      Name: this.form.controls['name'].value,
      Price: this.form.controls['price'].value,
      Sector: this.form.controls['sector'].value,
    }

    await this.data.saveProducto(producto);
    alert('Producto guardado correctamnete');
    
  }

  async uploadPhoto1()
  {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.Base64
    })
    if(image.base64String != undefined)
    {
      this.form.controls['photo1'].setValue(image.base64String);
    }
  }

  async uploadPhoto2()
  {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.Base64
    })
    if(image.base64String != undefined)
    {
      this.form.controls['photo2'].setValue(image.base64String);
    }
  }

  async uploadPhoto3()
  {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.Base64
    })
    if(image.base64String != undefined)
    {
      this.form.controls['photo3'].setValue(image.base64String);
    }
  }

}
