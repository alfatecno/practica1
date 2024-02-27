import { Producto } from './../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ProductosService {

 cargando = true;
 productos: Producto[] = [];
 productosFiltrado: Producto[] = [];



  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }


  private cargarProductos() {
    return new Promise<void>((resolve, reject) => {
        this.http.get<Producto[]>('https://proyecto-1-3cf3e-default-rtdb.firebaseio.com/productos_idx.json')
            .subscribe((resp: Producto[]) => {
                this.productos = resp;
                this.cargando = false;
                resolve(); // Aquí no se pasa ningún argumento a resolve porque no se necesitan datos adicionales.
            });
    });
}

  getProducto (id: string){

    return this.http.get(`https://proyecto-1-3cf3e-default-rtdb.firebaseio.com/productos/${id}.json`) //agregar backtick para insercciones de pedazos
  }


  buscarProducto (termino : string){

    if (this.productos.length===0){
      this.cargarProductos().then(() =>{
        //despues de tener los productos
        this.filtrarProductos(termino);//aplicar filtro
      }) ;  //cargar productos
    }else{
      this.filtrarProductos(termino);   //aplicar filtro
    }

  }

  private filtrarProductos(termino: string){

   this.productosFiltrado = [];

   termino =termino.toLocaleLowerCase();

   this.productos.forEach( prod =>{

    const tituloLower = prod.titulo.toLocaleLowerCase();

   if( prod.categoria.indexOf(termino) >=0 || tituloLower.indexOf( termino )>=0){

     this.productosFiltrado.push (prod);
   }
   })
  }
}
//`
