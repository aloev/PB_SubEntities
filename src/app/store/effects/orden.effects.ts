import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as OrdenActions from '../actions/orden.actions';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrdenServiceService } from '../../services/orden-service.service';
import { Orden } from '../../models/orden.model';


@Injectable()
export class OrdenEffects {

    constructor(
        private actions$: Actions,
        private ordenServicio: OrdenServiceService,
    ){}

    agregarOrden$ = createEffect(() => {

        return this.actions$.pipe(
            ofType( OrdenActions.crearOrden),
            mergeMap(
                (resp) => this.ordenServicio.agregarOrden(resp.orden)
                .pipe(
                    map(() => OrdenActions.neutral({ payload: 'Adios' }) )
                )
            )
        )
    });

    cargarOrdenes$ = createEffect(() => {

        return this.actions$.pipe(
            ofType( OrdenActions.cargarOrdenes ),
            mergeMap(
                () => this.ordenServicio.leerLs()
                .pipe(
                    map((resp: Orden[]) => 
                    
                    OrdenActions.loadOrdenes({ orden: resp }),
                    catchError( err => of(console.log('error', err)))
                    )
                )
            )
        )
    })

}
