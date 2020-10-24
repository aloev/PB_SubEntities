import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { plato } from '../models/platos.model';

@Injectable({
  providedIn: 'root'
})
export class PlatoServiceService {

  constructor() { }

  private platos: plato[] = [];


  get losplatos(): plato[] {
    return this.platos
  }
  
  // Deben ser OBSERVABLES

  saveComida( comida: plato ): Observable<any>{
    
    if( comida === null ){return; }
    this.platos = Object.assign([], this.platos);  // make a copy
    this.platos.push(comida);
    this.shootLS();
    return of(this.platos);
  }
  
  shootLS(){

    
    localStorage.setItem('platos', JSON.stringify(this.platos));
  }

  readLS(): Observable<plato[]>{

    let platicos = localStorage.getItem('platos');
    platicos = JSON.parse(platicos);

    if( platicos == null){
      return null;
    }
    else {
      
      let platox: {} = platicos;
      this.platos = [];

      Object.values(platox).map((item: plato) => {
        this.platos.push(item);
      });
      
      return of(this.platos);
      
    }
  }

  deletePlato( id: string ): Observable<plato[]>{
    
    this.platos = this.platos.filter( item => item.id !== id );
    this.shootLS();
    return of(this.platos);
  }

}
