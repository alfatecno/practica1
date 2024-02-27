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

       this.productos = resp;
       this.cargando = false;
    });
  }

  getProducto (id: string){

    return this.http.get(`https://proyecto-1-3cf3e-default-rtdb.firebaseio.com/productos/${id}.json`) //agregar backtick para insercciones de pedazos
  }

}
