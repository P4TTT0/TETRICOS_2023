import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';
import { PushNotificationService } from 'src/app/services/push-notifications.service';
import { QRReaderService } from 'src/app/services/qrreader.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-validated',
  templateUrl: './validated.component.html',
  styleUrls: ['./validated.component.scss'],
})
export class ValidatedComponent  implements OnInit 
{

  inWaitingList : boolean | string = "Esperando";
  userData : any;
  @Output() usingQRChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  usingQR : boolean = false;
  waitingForData = true;

  constructor(private navCtrl : NavController, 
    private QRReader : QRReaderService, 
    private toast : ToastService, 
    public auth : AutheticationService, 
    private data : DataService,
    private router : Router,
    private push : PushNotificationService) 
  {
    
  }

  async ngOnInit() 
  {
    try
    {
      this.data.getUserWaitingStatus(this.auth.userName).subscribe( (hola: any)  =>
      {
        this.userData = hola[0];
      })

      console.log(this.data);
      if(this.userData.state == 'waiting' || this.userData.state == 'assigned')
      {
        this.inWaitingList = true;
      }
    }
    catch(error)
    {
      this.inWaitingList = false
    }
    finally
    {
      this.waitingForData = false;
    }
  }

  async ingresarLocal()
  {
    this.usingQRChange.emit(true);
    this.QRReader.hideBackground();
    this.usingQR = true;
    const data = await this.QRReader.readQR();

    if(data?.hasContent)
    {
      this.usingQR = false;
      this.usingQRChange.emit(false);
      this.QRReader.showBackground();
      let dataString = this.QRReader.translateQR(data.content);
      let dataJSON = JSON.parse(dataString);
      try
      {
        console.log(dataJSON.Type);
        if(dataJSON.Type == 'IngresoAlLocal')
        {
          this.inWaitingList = true;
          let userToWaitinglist = 
          {
            name : this.auth.userName,
            state : 'waiting',
            Timestamp : "",
            orderStatus: 'SinPedir'
          }
          let userUID = await this.auth.getUserUid();
          this.data.saveUserWaitingList(userUID,userToWaitinglist);
          this.sendPushNotification();
        }
        else
        {
          if(dataJSON.Type == 'Mesa')
          {
            this.toast.showMessage('¡Lo sentimos! Antes de reclamar una mesa debes de ingresar a la lista de espera.', 4000)
          }
        }
      }
      catch(error)
      {
        this.toast.showMessage('Error. . . Ese QR no es parte de nuestro establecimiento')
      }
      
    }
  }

  public async onBackClick()
  {
    this.navCtrl.back();
  }

  async reclamarMesa()
  {
    this.usingQR = true;
    this.usingQRChange.emit(true);
    this.QRReader.hideBackground();
    const data = await this.QRReader.readQR();

    if(data?.hasContent)
    {
      this.usingQR = false;
      this.usingQRChange.emit(false);
      this.QRReader.showBackground();
      let dataString = this.QRReader.translateQR(data.content);
      let dataJSON = JSON.parse(dataString)

      try
      {
        console.log(dataJSON);
        if(dataJSON.Type == 'Mesa')
        {
          if(dataJSON.Number == this.userData.mesa)
          {
            this.router.navigateByUrl('mesa-general');
            this.auth.mesaAsignada = dataJSON.Number;
            await this.data.updateMesaAsignadaByUserName(this.auth.userName, dataJSON.Number);
          }
          else
          {
            this.toast.showMessage('Por favor, escanee el codigo de mesa que se le asignó', 4000)
          }
        }
        else
        {
          if(dataJSON.Type == 'IngresoAlLocal')
          {
            this.toast.showMessage('Usted ya se encuentra dentro del local...', 4000)
          }
        }
      }
      catch(error)
      {
        this.toast.showMessage('Error. . . Ese QR no es parte de nuestro establecimiento')
      }
    }
  }

  public async sendPushNotification() 
  {
    let metreTokens = await this.data.getMetreTokens();
    console.log(metreTokens);
    console.log('hola lol');
    this.push.sendPushNotification({
        registration_ids: metreTokens,
        notification: {
          title: '¡Nuevo cliente!',
          body: `Tienes un nuevo cliente esperando en la lista de espera.`,
        },
        data: {
          do: 'navigate',
          value: 
          {
            url: 'lista-espera',
          }
        },
      })
      .subscribe((data) => {
        console.log('hola sas' + data);
      });
  }
}
