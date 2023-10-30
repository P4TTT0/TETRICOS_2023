import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController : ToastController) { }

  public async showMessage(message: string, duration: number = 2000) 
  {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    })

    await toast.present();
  }
}
