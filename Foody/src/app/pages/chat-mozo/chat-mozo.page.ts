import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { NavController } from '@ionic/angular';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';
import { PushNotificationService } from 'src/app/services/push-notifications.service';

@Component({
  selector: 'app-chat-mozo',
  templateUrl: './chat-mozo.page.html',
  styleUrls: ['./chat-mozo.page.scss'],
})
export class ChatMozoPage implements OnInit {

  @ViewChildren('messageElement') messageElements!: QueryList<ElementRef>;
  chatForm : FormGroup;
  messages : any;
  mesa : any;

  constructor(public auth : AutheticationService, private formBuilder : FormBuilder, private data : DataService, private navCtrl : NavController, private push : PushNotificationService, private route : ActivatedRoute, private router : Router)
  {
    this.chatForm = this.formBuilder.group({
      message: ['',[ Validators.required]],
    });
    this.mesa = this.route.snapshot.paramMap.get('mesa');
  }

  async ngOnInit() 
  {
    console.log('mesa' + this.mesa);
    this.data.subscribeToMessages(this.mesa).subscribe((data) =>
    {
      this.messages = data;
      this.scrollToLastMessage();
    })
  }

  public async sendMessage()
  {
    if(this.chatForm.controls['message'].valid)
    {
      this.data.sendMessage(this.chatForm.controls['message'].value, this.auth.userName, this.mesa);
    }
    this.chatForm.controls['message'].setValue('');
    if(this.auth.rol == 'Usuario')
    {
      this.sendPushNotification();
    }
  }

  private scrollToLastMessage() {
    setTimeout(() => {
      const lastMessageElement = this.messageElements.last;
      if (lastMessageElement) {
        lastMessageElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });
  }

  public async sendPushNotification() 
  {
    let mozosTokens = await this.data.getMozosTokens();
    console.log(mozosTokens);
    console.log('hola lol');
    this.push.sendPushNotification({
        registration_ids: mozosTokens,
        notification: {
          title: '¡Nuevo mensaje!',
          body: `Tienes un nuevo mensaje de la mesa #${this.auth.mesaAsignada}`,
        },
        data: {
          do: 'navigate',
          value: 
          {
            url: 'chat-mozo',
            mesa: 1
          }
        },
      })
      .subscribe((data) => {
        console.log('hola sas' + data);
      });
  }

  public async onBackClick()
  {
    this.router.navigateByUrl('home');
  }

}
