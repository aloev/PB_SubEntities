import { createAction, props } from '@ngrx/store';
import { Cliente } from '../../models/cliente.model';

export const crearCliente = createAction(

    '[Clientes] Crear cliente',
    props<{ cliente: Cliente }>()
);
export const llenarCliente = createAction(

    '[Clientes] Llenar clientes',
    props<{ clientes: Cliente[] }>()
);