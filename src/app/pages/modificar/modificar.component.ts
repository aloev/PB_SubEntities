import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Orden } from 'src/app/models/orden.model';
import { cargarOrdenes } from 'src/app/store/actions/orden.actions';
import { _selectOAll } from 'src/app/store/reducers';
import { AppState } from '../../store/app.reducers';
import { cargarOrden } from '../../store/actions/verorder.actions';
import { plato } from 'src/app/models/platos.model';
import { Update } from '@ngrx/entity';
import { updateOrden } from '../../store/actions/orden.actions';
import { OrdenServiceService } from '../../services/orden-service.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  public lasOrdersTemp: Orden[] = [];
  public ourOrder: Orden;
  // Para la Cantidad
  public cantSeleccion: string  = '0';
  private verCantidad: string        = '';
  public nums: number[] = [0,1,2,3,4,5,6,7 ];
  private unplato: plato;
  
  
  
  constructor(

    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private ordenS: OrdenServiceService
  ) { }

  ngOnInit(): void {
    this.cargarOrdenesfromRedux();
    
    this.activatedRoute.params.subscribe(({id}) => this.findOrder(id) );
  
    // Cargar unica Orden
  
    this.cargarVerOrden();
  }

  capturar(){
    this.verCantidad = this.cantSeleccion;
  }

  miniChange( plato : plato){

    console.log('platu_Antes', this.ourOrder.plato);
    plato = Object.assign({}, plato );  // GENERA COPIA DEL OBJETO ENTRANTE para MODIFICAR
    plato.cantidad = '';
    this.unplato = plato;
    this.unplato.cantidad = this.verCantidad;
    this.unplato.total = 0;
    
    // Recalcula Total plato
    const quantum: number = parseInt(this.verCantidad);
    const totals: number = quantum * this.unplato.precio;
    this.unplato.total = totals;

    this.ourOrder = Object.assign([], this.ourOrder );
    
    this.ourOrder.plato = this.ourOrder.plato.filter(item => item.id !== plato.id);
    if( this.unplato.cantidad === '0' ){
      return;
    }
    this.ourOrder.plato.push(this.unplato);
    
    // Modificar total orden
    let totalz: number = 0 ;
    for(let i of this.ourOrder.plato){
      totalz += i.total;
    }
    this.ourOrder.total = totalz;

    console.log('platu_Despues', this.ourOrder.plato);
  }

  cargarVerOrden(){

    this.store.dispatch( cargarOrden({ orden: this.ourOrder} ) );
    

  }

  cargarOrdenesfromRedux(){

    this.store.dispatch(cargarOrdenes());

    this.store.select(_selectOAll).subscribe((resp: Orden[]) => {
      Object.values(resp).map(( item : Orden ) => {                //Eliminar Num Keys
        this.lasOrdersTemp.push(item);
      });
    });
  }

  findOrder( id: string){
    let key: Orden;
    for (key of this.lasOrdersTemp) {
      if( key.id === id ){
        this.ourOrder = key;
      }
    }
  }

  mandarChange(){



    const update: Update<Orden> = {
      id: this.ourOrder.id,
      changes:  this.ourOrder
    };

    console.log('Disparo', this.ourOrder);
    
    this.store.dispatch(updateOrden({ orden: update  }));

    this.ordenS.ordenesModificadas(this.ourOrder);
  }

}
