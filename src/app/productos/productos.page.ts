import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicio/producto/producto.service';
import { Producto } from '../interfaces/Producto';
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements ViewWillEnter, ViewDidLeave {
  public productos: Producto[] =[];
  private subProducto!: Subscription;
  
  constructor(
    private prdS: ProductoService ) { }

  ionViewDidLeave(): void {
    if(this.subProducto){
      this.subProducto.unsubscribe();
    }
  }

  ionViewWillEnter(): void {
    this.prdS.producto.subscribe( productos => {
      this.productos = productos;
    });
    this.prdS.listarProductos();
  }

  //public siguiente(){
    //this.prdS.siguientesProductos();
  //}

  public siguiente(event: any) {
    // Tiempo carga
    setTimeout(() => {
      this.prdS.siguientesProductos(); // Llama a la función para obtener más productos
      // Suscríbete a los productos para recibir la nueva lista
      this.prdS.producto.subscribe((productos) => {
        if (productos.length > 0) {
          event.target.complete(); // Completa el evento de Infinite Scroll si hay productos
        } else {
          event.target.disabled = true; // Desactiva el Infinite Scroll si no hay más productos
        }
      });
    }, 1300);
  }

  public anterior(){
    this.prdS.productosAnterior();
  }


}
