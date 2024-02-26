import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina ={};
  cargada = false;
  equipo: any;

  constructor( private http: HttpClient) {

   // console.log('servicio de infopagina ,listo');
    //leer el aricho json y tomar sus propiedades
   this.cargarInfo();
   this.cargarEquipo();
  }

  private cargarInfo(){

    this.http.get('assets/data/data-pagina.json')
               .subscribe( (resp: InfoPagina) =>{
                this.cargada = true;
                this.info = resp;


               });
  }
  private cargarEquipo(){

    this.http.get('https://proyecto-1-3cf3e-default-rtdb.firebaseio.com/equipo.json')
    .subscribe( (resp:any ) =>{
     this.equipo = resp; //la respuesta generada
     console.log(resp);  //para mirarlo en la consola

    });
  }
}
