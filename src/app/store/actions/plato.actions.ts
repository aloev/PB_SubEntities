


import { createAction, props } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { plato } from '../../models/platos.model';




export const crearPlato = createAction(

    '[Platos] Crear plato',
    props<{ plato: plato }>()
);
export const loadPlatos = createAction(

    '[Platos] Cargar los plato',
    props<{ platos: plato[] }>()
);

export const eliminarPlato = createAction(

    '[Platos] Eliminar Plato',
    props<{ id: string}>()

);

export const cargarPlatos = createAction(

    '[Platos] Cargar Platos'

);
export const neutral = createAction(

    '[Platos] Neutral Plato',
    props<{ payload: any}>()

);