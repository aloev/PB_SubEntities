import * as actions from '../actions';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { state } from '@angular/animations';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Orden } from '../../models/orden.model';
import { crearOrden, loadOrdenes } from '../actions/orden.actions';


// Crear Entidades

export const ordenAdapter = createEntityAdapter<Orden>();

export interface OrdenState extends EntityState<Orden>{
    error: any;
}

export const ordenInitialState: OrdenState = ordenAdapter.getInitialState({
    error: undefined
});

// 

export const ordenReducer = createReducer(
    ordenInitialState,

    on( crearOrden, ( state, action ) => {
        console.log('llega', action.orden);
        
        return ordenAdapter.addOne(action.orden, state);
    }),

    on(loadOrdenes, (state, action) => {
        return ordenAdapter.setAll(action.orden, state);
    })
    // on( llenarCliente, ( state, action ) => {
    //     return clienteAdapter.setAll(action.clientes, state);
    // }),
)


export const getOrdenState = createFeatureSelector<OrdenState>('ordenes');

export const {
    
    selectIds: _selectOIds,
    selectEntities: _selectOEntitites,
    selectAll: _selectOAll,
    selectTotal: _selectOTotal

} = ordenAdapter.getSelectors(getOrdenState);

