import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  public clientes: Cliente[] = [];

  constructor() { }

  shootLS(){

    localStorage.setItem('clientes', JSON.stringify(this.clientes));
  }

  readLS(): Observable<Cliente[]>{

    let platicos = localStorage.getItem('clientes');
    platicos = JSON.parse(platicos);

    if( platicos == null){
      return null;
    }
    else {
      
      let platox: {} = platicos;
      this.clientes = [];

      Object.values(platox).map((item: Cliente) => {
        this.clientes.push(item);
      });
      
      return of(this.clientes);
      
    }
  }


}
