import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addDoc, collection, Firestore, getDoc, getDocs, updateDoc, collectionData, doc, query, where, orderBy, setDoc, onSnapshot, Timestamp } from
'@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';
import { PushNotificationService } from 'src/app/services/push-notifications.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent  implements OnInit {

  private lastDocument : any;
  private notificacionEnviada : boolean = false;

  constructor(private router : Router, private auth : AutheticationService, private push : PushNotificationService, private data : DataService, private firestore : Firestore) { }

  ngOnInit() {
    this.startUserListener();
  }

  public async onValidateUserClick()
  {
    this.router.navigateByUrl('validar-usuario');
  }

  public async startUserListener() {
    const userCollection = collection(this.firestore, 'User');
    const q = this.lastDocument
      ? query(userCollection, where('__name__', '>', this.lastDocument))
      : query(userCollection);
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          // Se ha añadido un nuevo documento de usuario.
          this.sendPushNotification();
          // Actualizar el último documento observado.
          this.lastDocument = change.doc;
          console.log(this.lastDocument);
        }
      });
    });
  };
  
  async sendPushNotification() 
  {
    let userToken = await this.data.getUserTokenByUserName(this.auth.userName);
    
    console.log('hola lol');
    this.push.sendPushNotification({
        registration_ids: [
          userToken,
        ],
        notification: {
          title: '¡Se ha registrado un nuevo usuario!',
          body: 'Tienes un nuevo usuario para verificar.',
        },
      })
      .subscribe((data) => {
        console.log('hola sas' + data);
      });
  }
}
