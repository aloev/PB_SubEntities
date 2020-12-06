import { createAction, props } from '@ngrx/store';
import { Orden } from '../../models/orden.model';



export const cargarOrden = createAction(
    '[Orden] cargar la orden',
    props<{ orden: Orden }>()
);