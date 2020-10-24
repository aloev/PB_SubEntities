import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { plato } from '../../models/platos.model';
import { PlatoState, _selectPAll } from '../../store/reducers/plato.reducer';
import { crearPlato, eliminarPlato, cargarPlatos } from '../../store/actions/plato.actions';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private store: Store<PlatoState>
  ) { }


  public losplatos: plato[] = [];

  ngOnInit(): void {

    this.cargarPlatos();
  }

  cargarPlatos(){
    
    if( localStorage.getItem('platos') === null ){return;}
    this.store.dispatch(cargarPlatos());

    this.store.select(_selectPAll).subscribe((elementos: plato[]) => {
      this.losplatos = elementos;
    });
  }


  async agregarP(){
    const { value: formValues } = await Swal.fire({
      title: 'Crea Plato',
      html:
        '<input id="swal-input1" class="swal2-input">' +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value
        ]
      }
    });
    
    if (formValues) {

      const paquete: plato = {
        nombre: formValues[0],
        precio : parseInt(formValues[1]),
        id: new Date().getUTCMilliseconds().toString(), 
      }
      console.log('envio',paquete);
      
      this.store.dispatch(crearPlato({plato: paquete}));
      this.cargarPlatos();

      console.log('paso por acaaa', paquete);
      
    }
    
  }



  deleteUser( comida: plato ){

    this.store.dispatch(eliminarPlato({id: comida.id}));
    this.ngOnInit();
  }

}
