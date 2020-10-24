import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { plato } from '../../models/platos.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarPlatos } from '../../store/actions/plato.actions';
import { _selectOAll, _selectPAll } from 'src/app/store/reducers';
import { Cliente } from '../../models/cliente.model';
import { crearCliente, llenarCliente } from '../../store/actions/cliente.actions';
import { ClienteServiceService } from '../../services/cliente-service.service';
import { crearOrden, cargarOrdenes } from '../../store/actions/orden.actions';
import { Orden } from '../../models/orden.model';
import { stringify } from '@angular/compiler/src/util';
import { PlatoServiceService } from '../../services/plato-service.service';

@Component({
  selector: 'app-hacer-pedido',
  templateUrl: './hacer-pedido.component.html',
  styleUrls: ['./hacer-pedido.component.css']
})
export class HacerPedidoComponent implements OnInit {

  newescucharClient: Cliente = { nombre:'', id: '' };
  public losdishes: plato[] = []; 
  public losclientes: Cliente[] = []; 
  // Para
  public autorSelected: string;
  private verautor: string ;

  // Para la Cantidad
  public cantSeleccion: string  = '0';
  private verCantidad: string        = '';
  public nums: number[] = [1,2,3,4,5,6,7 ];


  // Arreglo para temp de platos del menu

  public tempDish: plato[] = [];

  constructor(

    private store: Store<AppState>,
    private clienteService: ClienteServiceService,
    private platoService: PlatoServiceService,
  ) { }

  ngOnInit(): void {
    this.cargarDishes();
    this.cargarClientes();
    this.cargarOrdedRedux();
  }

  cargarOrdedRedux(){

    this.store.dispatch(cargarOrdenes());

    this.store.select(_selectOAll).subscribe((resp:Orden[] ) => {
      console.log('Ha llegado', resp);
      
    });
  }

  cargarClientes(){

    if( localStorage.getItem('clientes') === null){ return; }

    this.clienteService.readLS().subscribe((clientes: Cliente[]) => {
      this.losclientes = clientes;
      this.store.dispatch(llenarCliente({clientes:clientes}));
    });

  }

  cargarDishes(){

    if( localStorage.getItem('platos') === null){ return; }
    this.store.dispatch(cargarPlatos());

    this.store.select(_selectPAll).subscribe((plats: plato[]) => {
      this.losdishes = plats;
    });

  }

  addCliente(){



    const envio: Cliente = {
      id: new Date().getUTCMilliseconds().toString(),
      nombre: this.newescucharClient.nombre
    };

    this.clienteService.clientes = Object.assign([],this.clienteService.clientes );
    this.clienteService.clientes.push(envio);

    this.store.dispatch(crearCliente({cliente: envio }));

    this.clienteService.shootLS();

    this.losclientes = [];
    this.cargarClientes();

  }

  // TODO: id
  leerA(){ 
    console.log('aki',this.verautor);
    
    this.verautor = this.autorSelected;}


  // Llenar Opciones de comida
  capturar(){

    for (let index of this.nums){
      if( index.toString() === this.cantSeleccion ){
        this.verCantidad = index.toString();
      }
    }
  }
  crearMini( desh: plato){

    const meter: plato = {

      nombre: desh.nombre,
      id: desh.id,
      precio: desh.precio,
      cantidad: this.verCantidad,
    }

    this.tempDish.push(meter);

    console.log('peididot', this.tempDish );
    
  }

  endPedido(){

    let UserId: string;

    for( let user of this.losclientes){

      if( user.nombre === this.verautor ){
        UserId = user.id ;
      }
    }


    const laorden: Orden = {
      id: new Date().getUTCMilliseconds().toString(),
      userID: UserId,
      plato: this.tempDish
    }
    console.log('los platos', this.tempDish);
    console.log('la Orden', laorden );
    

    console.log('antes platos', this.platoService.losplatos);
    this.store.dispatch(crearOrden({ orden: laorden }));
    console.log('despues platos', this.platoService.losplatos);
    
    this.tempDish = [];
  }

}
