import { plato } from './platos.model';


export interface Orden {

    id: string,
    userID: string,
    plato: plato[],
    total?: number,

}