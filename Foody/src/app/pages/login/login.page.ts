import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutheticationService } from 'src/app/services/authetication.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Variable para validar los campos del login.
  public form : FormGroup;

  // ||====|| Constructor ||====||
  constructor(private formBuilder : FormBuilder, private toast : ToastService, private auth : AutheticationService, private router : Router) 
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
  ngOnInit() {}

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
        if(user?.user?.emailVerified == true)
        {
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
}
