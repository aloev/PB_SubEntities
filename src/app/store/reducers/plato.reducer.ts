
import * as actions from '../actions';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { state } from '@angular/animations';
import { plato } from '../../models/platos.model';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { crearPlato, eliminarPlato, loadPlatos } from '../actions/plato.actions';


// Crear Entidades

export const platoAdapter = createEntityAdapter<plato>();

export interface PlatoState extends EntityState<plato>{
    error: any;
}

export const platoInitialState: PlatoState = platoAdapter.getInitialState({
    error: undefined
});

export const platoReducer = createReducer(
    platoInitialState,

    on(crearPlato, ( state, action) => {
        return platoAdapter.addOne(action.plato, state);
    }),
    on(eliminarPlato, ( state, action) => {
        return platoAdapter.removeOne(action.id, state);
    }),
    on(loadPlatos, ( state, action) => {
        
        return platoAdapter.setAll(action.platos, state);
    }),
    // on(loadPlatos, ( state, action) => {
        
    //     return platoAdapter;
    // }),

)


export const getPlatoState = createFeatureSelector<PlatoState>('platos');

export const {
    
    selectIds: _selectPIds,
    selectEntities: _selectPEntitites,
    selectAll: _selectPAll,
    selectTotal: _selectPTotal

} = platoAdapter.getSelectors(getPlatoState);


