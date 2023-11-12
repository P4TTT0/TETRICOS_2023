import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { Firestore, collection, doc, docData, updateDoc } from '@angular/fire/firestore';
import { LocalNotifications } from '@capacitor/local-notifications';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { AutheticationService } from './authetication.service';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  private userUID : any;
  constructor(
    private platform: Platform,
    private firestore: Firestore,
    private http: HttpClient,
    private data : DataService,
    private auth : AutheticationService
  ) {
  }

  async inicializar(): Promise<void> {
    this.addListeners();
    let userToken = await this.data.getUserTokenByUserName(this.auth.userName);
    console.log(userToken);
    const result = await PushNotifications.requestPermissions();
    await PushNotifications.register();
    if (this.platform.is('capacitor') && userToken == '') {
      if (result.receive === 'granted') {
      }
    }
  }

  async getUser() 
  {
    this.userUID = await this.data.GetUserUIDByUserName(this.auth.userName);
    this.inicializar();
  }

  sendPushNotification(req : any): Observable<any> {
    return this.http.post<Observable<any>>(environment.fcmUrl, req, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `key=${environment.fcmServerKey}`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
    });
  }

  private async addListeners(): Promise<void> {
    //Ocurre cuando el registro de las push notifications finaliza sin errores
    await PushNotifications.addListener(
      'registration',
      async (token: Token) => {
        console.log('HOLAAAA');
        console.log('Registration token: ', token.value);
        const userCollection = collection(this.firestore, 'User');
        const docRef = doc(userCollection, this.userUID);

        await updateDoc(docRef, {
          token: token.value,
        });
      }
    );

    //Ocurre cuando el registro de las push notifications finaliza con errores
    await PushNotifications.addListener('registrationError', (err) => {
      console.log('HOLAAAA');
      console.error('Registration error: ', err.error);
    });

    //Ocurre cuando el dispositivo recive una notificacion push
    await PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        //Este evento solo se activa cuando tenemos la app en primer plano
        console.log('Push notification received: ', notification);
        console.log('data: ', notification.data);
        //Esto se hace en el caso de que querramos que nos aparezca la notificacion en la task bar del celular ya que por
        //defecto las push en primer plano no lo hacen, de no ser necesario esto se puede sacar.
        LocalNotifications.schedule({
          notifications: [
            {
              title: notification.title || '',
              body: notification.body || '',
              id: new Date().getMilliseconds(),
              extra: {
                data: notification.data,
              },
            },
          ],
        });
      }
    );

    //Ocurre cuando se realiza una accion sobre la notificacion push
    await PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        //Este evento solo se activa cuando tenemos la app en segundo plano y presionamos sobre la notificacion
        console.log(
          'Push notification action performed',
          notification.actionId,
          notification.notification
        );
      }
    );

    //Ocurre cuando se realiza una accion sobre la notificacion local
    await LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (notificationAction) => {
        console.log('action local notification', notificationAction);
      }
    );
  }
}