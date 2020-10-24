import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PlatoActions from '../actions/plato.actions';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { PlatoServiceService } from '../../services/plato-service.service';
import { plato } from '../../models/platos.model';
import { of } from 'rxjs';


@Injectable()
export class PlatoEffects {

    constructor(
        private actions$: Actions,
        private platoServicio: PlatoServiceService

    ){}
    
    guardarPlatos$ = createEffect(() => {

        return this.actions$.pipe(
            ofType( PlatoActions.crearPlato ),
            mergeMap(
                (resp) => this.platoServicio.saveComida(resp.plato)
                .pipe(
                    map(() => PlatoActions.neutral({payload: 'hola' })
                     )
                ) 
            )
        )
    });

    cargarPlatos$ = createEffect(() => {

        return this.actions$.pipe(
            ofType( PlatoActions.cargarPlatos ),
            mergeMap(
                () => this.platoServicio.readLS()
                .pipe(
                    map((resp: plato[]) => 
                    PlatoActions.loadPlatos({ platos: resp}),
                    catchError( err => of(console.log(err)))
                    )
                )
            )
        )
        
    });

    eliminarPlato$ = createEffect(() => {
        
        return this.actions$.pipe(
            ofType( PlatoActions.eliminarPlato ),
            mergeMap(
                (resp) => this.platoServicio.deletePlato(resp.id)
                .pipe(
                    map(() => PlatoActions.neutral({payload: 'hola' })
                    ) 
                )
            )
        )
    })

}