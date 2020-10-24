import { createAction, props } from '@ngrx/store';
import { Orden } from '../../models/orden.model';

export const crearOrden = createAction(

    '[Orden] Crear platico',
    props<{ orden: Orden }>()
);

export const neutral = createAction(
    '[Orden] Neutral orden',
    props<{ payload: any }>()
);

export const cargarOrdenes = createAction(
    '[Orden] Cargar Ordenes'
);

export const loadOrdenes = createAction(

    '[Orden] Load Ordenes',
    props<{ orden: Orden[] }>()

);