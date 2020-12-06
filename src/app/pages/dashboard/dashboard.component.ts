import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { _selectOAll } from 'src/app/store/reducers';
import { AppState } from '../../store/app.reducers';
import { Orden } from '../../models/orden.model';
import { cargarOrdenes } from '../../store/actions/orden.actions';


/// Hola mundo
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  public lasOrdersTemp: Orden[] = [];
  public lasOrders: Orden[] = [];

  constructor(

    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.cargarOrdenesfromRedux();
  }

  cargarOrdenesfromRedux(){

    this.store.dispatch(cargarOrdenes());

    this.store.select(_selectOAll).subscribe((resp: Orden[]) => {
      Object.values(resp).map(( item : Orden ) => {                //Eliminar Num Keys
        this.lasOrdersTemp.push(item);
      });
    });    
  }

  editar( id: string ){

    // console.log('si', id);
    
  }
}
