import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutheticationService } from 'src/app/services/authetication.service';
import { QRReaderService } from 'src/app/services/qrreader.service';
import { ToastService } from 'src/app/services/toast.service';


import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  //Variable para validar los campos del login.
  public form : FormGroup;
  usandoQR = false;

  // ||====|| Constructor ||====||
  constructor(private formBuilder : FormBuilder, private toast : ToastService, private auth : AutheticationService, private router : Router, private QRReader : QRReaderService) 
  {
    this.form = this.formBuilder.group({
      email: ['',[Validators.required]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.pattern("[0-9]{8}")]],
      username: ['', [Validators.required]],
      photo: ['', [Validators.required]]
    })
  }

  // ||====|| Eventos ||====||
  ngOnInit() {}

  // ||====|| Funciones || ====||
  
  /**
   * The function checks if the form is valid, logs in the user using the provided email and password,
   * and navigates to the home page if the login is successful, otherwise it displays an error message.
   */
  public async registerClient() : Promise<void>
  {
    if(this.form.valid)
    {

      let userData = 
      {
        Email : this.form.controls['email'].value,
        JoinDate : undefined,
        Rol : 'Usuario',
        UserName : this.form.controls['username'].value,
        Validated : false,
        Name : this.form.controls['name'].value,
        LastName : this.form.controls['lastname'].value,
        DNI : this.form.controls['dni'].value,
        PhotoBase64 : this.form.controls['photo'].value
      }

      const user = await this.auth.register(userData);
      
      if(user)
      {
        this.router.navigateByUrl('/home');
      }
      else
      {
        this.toast.showMessage('¡Ya hay un usuario registrado con ese correo electronico!')
      }
    }
    else
    {
      this.toast.showMessage('¡Tienes errores en los campos!')
      console.log(this.form.controls);
    }
  }

  async uploadPhoto()
  {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.Base64
    })
    if(image.base64String != undefined)
    {
      this.form.controls['photo'].setValue(image.base64String);
    }
  }

  async readQR()
  {
    
    this.usandoQR = true;
    this.QRReader.hideBackground();
   
    const datos = await this.QRReader.readQR()
    
    if(datos?.hasContent)
    {
      this.QRReader.showBackground();
      this.usandoQR = false;
      let datosSeparados = datos.content.split("@");
      if(datosSeparados[0].length == 11)
      {
        this.form.controls['name'].setValue(datosSeparados[2]); 
        this.form.controls['lastname'].setValue(datosSeparados[1]);
        this.form.controls['dni'].setValue(datosSeparados[4]);
      }
      else
      {
        this.form.controls['name'].setValue(datosSeparados[5]); 
        this.form.controls['lastname'].setValue(datosSeparados[4]);
        this.form.controls['dni'].setValue(datosSeparados[1]);
      }
    }
  }
  

}
