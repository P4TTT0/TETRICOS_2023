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
  public async onLoginClick() : Promise<void>
  {
    if(this.form.valid)
    {
      const user = await this.auth.logIn(this.form.controls['email'].value, this.form.controls['password'].value);
      if(user?.user)
      {
        this.router.navigateByUrl('/home');
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
