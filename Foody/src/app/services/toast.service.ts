import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  // ||====|| Constructor ||====||
  constructor(private toastController : ToastController) { }

  // ||====|| Funciones ||====||

  /**
   * The function `showMessage` displays a toast message with the given message and duration.
   * @param {string} message - The message parameter is a string that represents the message you want
   * to display in the toast. It can be any text or information you want to show to the user.
   * @param {number} [duration=2000] - The duration parameter is an optional parameter that specifies
   * the duration in milliseconds for which the toast message should be displayed. If no duration is
   * provided, the default value of 2000 milliseconds (2 seconds) will be used.
   */
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
