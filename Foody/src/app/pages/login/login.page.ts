import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';
import { ToastService } from 'src/app/services/toast.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Variable para validar los campos del login.
  public form : FormGroup;
  public logged : boolean = false;

  // ||====|| Constructor ||====||
  constructor(private formBuilder : FormBuilder, private toast : ToastService, private auth : AutheticationService, private router : Router, private platform: Platform) 
  {
    this.form = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
        ]],
      password: ['', [Validators.required]]
    })

  }

  // ||====|| Eventos ||====||
  ngOnInit() 
  {
    this.logged = false
  }

  // ||====|| Funciones || ====||
  

  /**
   * This function handles the login process, including form validation, authentication, and
   * navigation.
   */
  public async onLoginClick() : Promise<void>
  {
    if(this.form.valid)
    {
      const user = await this.auth.logIn(this.form.controls['email'].value, this.form.controls['password'].value);
      if(user?.user)
      {
        if(user?.user?.emailVerified == true || this.form.controls['email'].value == 'admin@admin.com')
        {
          this.logged = true;
          this.router.navigateByUrl('/home');
        }
        else
        {
          this.toast.showMessage('¡No se ha verificado el mail!')
          this.auth.logOut();
        }
      }
      else
      {
        this.toast.showMessage('¡Credenciales incorrectas!')
      }
    }
    else
    {
      this.toast.showMessage('¡Tienes errores en los campos!')
    }
  }
  
  public onFillFields(emailQuickAccess : string, passwordQuickAccess : string)
  {
    this.form.setValue(
      {
        email: emailQuickAccess,
        password: passwordQuickAccess
      }
    ) 
  }

  async onAnonLoginClick(){

    await this.auth.anonLogin();
    this.router.navigateByUrl('/home');
  }
}
