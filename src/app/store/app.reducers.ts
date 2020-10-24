import { ActionReducerMap, ReducerObservable } from '@ngrx/store';
import * as reducers from './reducers';
import { ClienteState } from './reducers/cliente.reducer';
import { OrdenState } from './reducers/orden.reducer';

export interface AppState {
    platos: reducers.PlatoState,
    clientes: reducers.ClienteState,
    ordenes: reducers.OrdenState,
}



export const appReducers: ActionReducerMap<AppState> = {
    platos: reducers.platoReducer,
    clientes: reducers.clienteReducer,
    ordenes: reducers.ordenReducer
}