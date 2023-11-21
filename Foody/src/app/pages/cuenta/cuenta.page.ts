import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AutheticationService } from 'src/app/services/authetication.service';
import { DataService } from 'src/app/services/data.service';
import { QRReaderService } from 'src/app/services/qrreader.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  pedidos: any;
  total: number = 0;
  propina: number = 0;  
  userData : any;
  @Output() usingQRChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  usingQR : boolean = false;
  waitingForData = true;
  
  constructor(private data: DataService,
              private auth: AutheticationService,
              private router: Router,
              private QRReader : QRReaderService,
              private toast : ToastService) { }

  async ngOnInit() {
    
    const rawPedidos = await this.data.getCuentaFromUser("Luih_8");
    
    const productosAgrupados: { [nombreProducto: string]: { cantidad: number, precio: number } } = {};
    
    rawPedidos.forEach((pedido: { NombreProducto: any; Cantidad: number; ProductPrice: number; }) => {
      const nombreProducto = pedido.NombreProducto;
      const cantidad = pedido.Cantidad || 1; 
      const precio = pedido.ProductPrice;
      
      if (productosAgrupados[nombreProducto]) {
        // Si el producto ya existe, actualizar la cantidad
        productosAgrupados[nombreProducto].cantidad += cantidad;
      } else {
        // Si el producto no existe, agregarlo al objeto
        productosAgrupados[nombreProducto] = { cantidad, precio };
      }
    });

    // Crear un nuevo array con la información agrupada
    this.pedidos = Object.keys(productosAgrupados).map(nombreProducto => {
      const cantidad = productosAgrupados[nombreProducto].cantidad;
      const precioUnitario = productosAgrupados[nombreProducto].precio;
      const totalPorProducto = cantidad * precioUnitario;
      
      // Calcular el total general sumando el total de cada producto
      this.total += totalPorProducto;

      return {
        NombreProducto: nombreProducto,
        Cantidad: cantidad,
        Precio: precioUnitario,
        TotalPorProducto: totalPorProducto
      };
    });

    console.log(this.pedidos);
    console.log('Total:', this.total);
  }

  onPagar()
  {
    this.data.pagarCuenta(this.auth.userName,"PorPagar",this.total)
    this.router.navigateByUrl("mesa-general")
  }

  async darPropina()
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
        if(dataJSON.Type == 'Propina')
        {
          this.propina = this.total * dataJSON.Porcentaje / 100;   
          this.total += this.propina;    
        }
        else
        {
          this.toast.showMessage("Escanee uno de los QRs de la propina")
        }
      }
      catch(error)
      {
        this.toast.showMessage('Error. . . Ese QR no es parte de nuestro establecimiento')
      }
      
    }
  }
}
