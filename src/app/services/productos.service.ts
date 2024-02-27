import { Producto } from './../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ProductosService {

 cargando = true;
 productos: Producto[] = [];



  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }


  private cargarProductos() {

    this.http.get<Producto[]>('https://proyecto-1-3cf3e-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe((resp: Producto[]) => {
       console.log(resp);
       this.productos = resp;
       this.cargando = false;


    });

  }

}
