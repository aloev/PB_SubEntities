import { Injectable } from '@angular/core';
import { Orden } from '../models/orden.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenServiceService {


  private ordenes: Orden[] = [];

  constructor() { }

  agregarOrden( order: Orden ): Observable<any> {

    if( order === null ){ return;}

    // Validator - Copy
    this.ordenes = Object.assign([], this.ordenes );
    this.ordenes.push(order);
    this.dispararLs();
    return of(this.ordenes) ;

  }

  ordenesModificadas(orden: Orden){

    orden = Object.assign({}, orden);

    this.ordenes = Object.assign([], this.ordenes );
    this.ordenes = this.ordenes.filter( laorden => laorden.id !== orden.id);

    this.ordenes.push(orden);

    this.dispararLs();
    
  }

  dispararLs(): void{
    
    localStorage.setItem('ordenes', JSON.stringify(this.ordenes));
  }

  leerLs(): Observable<Orden[]> {

    let ordensitos = localStorage.getItem('ordenes');
    ordensitos = JSON.parse(ordensitos);

    if( ordensitos === null){
      return null ;
    }else {

      let ordex: {} = ordensitos;
      this.ordenes = [];

      Object.values(ordex).map(( item: Orden ) => {
        this.ordenes.push(item);
      });
      return of(this.ordenes);
    }
  }
}
