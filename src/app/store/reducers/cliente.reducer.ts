import * as actions from '../actions';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { state } from '@angular/animations';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Cliente } from '../../models/cliente.model';
import { crearCliente, llenarCliente } from '../actions/cliente.actions';


// Crear Entidades

export const clienteAdapter = createEntityAdapter<Cliente>();

export interface ClienteState extends EntityState<Cliente>{
    error: any;
}

export const clienteInitialState: ClienteState = clienteAdapter.getInitialState({
    error: undefined
});

// 

export const clienteReducer = createReducer(
    clienteInitialState,

    on( crearCliente, ( state, action ) => {
        return clienteAdapter.addOne(action.cliente, state);
    }),
    on( llenarCliente, ( state, action ) => {
        return clienteAdapter.setAll(action.clientes, state);
    }),
)


export const getclienteState = createFeatureSelector<ClienteState>('clientes');

export const {
    
    selectIds: _selectCIds,
    selectEntities: _selectCEntitites,
    selectAll: _selectCAll,
    selectTotal: _selectCTotal

} = clienteAdapter.getSelectors(getclienteState);

