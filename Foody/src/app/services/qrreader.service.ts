import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class QRReaderService 
{

  async readQR()
  {
    await BarcodeScanner.checkPermission({force : true})
    return BarcodeScanner.startScan()
  }

  async hideBackground()
  {
    await BarcodeScanner.hideBackground();
    document.querySelector('body')?.classList.add('scanner-active');
  }

  async showBackground()
  {
    await BarcodeScanner.showBackground();
    document.querySelector('body')?.classList.remove('scanner-active');
  }

  translateQR(data : string)
  {
    let dataTranslated = data.replace(/&#34;/g, '"');
    dataTranslated = dataTranslated.replace(/&#13;&#10;/g, '');
    return dataTranslated;
  }


}
