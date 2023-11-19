import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {

  public form : FormGroup;

  constructor(private formBuilder : FormBuilder, 
              private toast : ToastService, 
              private auth : AutheticationService, 
              private router : Router,
              private data : DataService) { 

    this.form = this.formBuilder.group({

      atencion: [1, [Validators.required]],
      comida: [1, [Validators.required]],
      resenia: [, [Validators.required]],
      general: [1, [Validators.required]],
    })
  }

  ngOnInit() {
    
  }

  submitEncuesta()
  {   
    let encuesta = {

      usuario: this.auth.userName,
      atencion: this.form.controls["atencion"].value,
      general: this.form.controls["general"].value,
      comida: this.form.controls["comida"].value,
      resenia: this.form.controls["resenia"].value
    };

    this.data.saveEncuesta(encuesta);
    this.auth.encuesta = true;
    this.router.navigateByUrl("/graficos")
    console.log(this.form.controls["atencion"].value)
    console.log(this.form.controls["comida"].value)
    console.log(this.form.controls["general"].value)
    console.log(this.form.controls["resenia"].value)
  }
}
