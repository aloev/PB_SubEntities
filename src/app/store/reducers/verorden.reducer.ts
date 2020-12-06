import { createReducer, on } from '@ngrx/store';
import { plato } from '../../models/platos.model';
import { cargarOrden } from '../actions/verorder.actions';
import { state } from '@angular/animations';


export interface Order {

    id: string,
    userID: string,
    plato: plato[],
    total?: number,

}

export const ordenInicialS: Order = {
    id: null,
    userID: null,
    plato: [],
    total:null,
}

const _verordenReducer = createReducer(ordenInicialS,


    on(cargarOrden, (state, action) => ({
        ...state,
        id: action.orden.id,
        userID: action.orden.userID,
        plato: { ...action.orden.plato },
        total: action.orden.total
    })
    
    
    
    )
    
//     on(cargarUsuario, (state, {id}) => ({ 
//             ...state, 
//             loading: true,
//             id: id
// })),
    
//     on(cargarUsuarioSuccess, (state, { usuario}) => ({ 
//         ...state,
//          loading: false,
//          loaded: true,
//          user: { ...usuario }
//         })),

    // on(cargarUsuarioError, (state, {payload}) => ({ 
    //     ...state,
    //     loading: false,
    //     loaded: false,
    //     error: {
    //         url:payload.url,
    //         name: payload.name,
    //         message: payload.message
    //     }
    //     })),
);

export function verordenReducer(state, action) {
    return _verordenReducer(state, action);
}