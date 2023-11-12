import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.scss'],
})
export class UserInfoModalComponent  implements OnInit {
  @Input() user : any;
  mensajes : any;
  constructor(private modalController : ModalController, private data : DataService) { }

  ngOnInit() {
    this.mensajes = ["Hemos decidido aceptar tu cuenta. Ahora eres parte de nuestros clientes registrados. ¡Felicidades!",
  "Lamentablemente hemos decidido rechazar la solicitud de tu cuenta. No podrás formar parte de nuestros clientes por ahora."]
  }

  public async onDecideClick(validated : boolean | null)
  {
    if(validated != null)
    {
      let userUID = await this.data.getUIDByUserName(this.user.UserName) || ''
      this.data.UpdateValidationUser(userUID, validated)  
      let mensaje = "";
      if(validated)
      {
        mensaje = this.mensajes[0];
      }    
      else{
        mensaje = this.mensajes[1];
      }
      emailjs.init("lhlBvZ3-RfRk1deln");
      await emailjs.send("service_hczbfu1","template_xaeixge", {
        from_name: 'Foody',
        to_name: this.user.UserName,        
        to_email: this.user.Email,
        subject: 'Estado de tu cuenta en Foody',
        message: mensaje,
      }); 
    }

    this.modalController.dismiss();
  }
}
