import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EspecificoComponent } from './pages/especifico/especifico.component';
import { HacerPedidoComponent } from './pages/hacer-pedido/hacer-pedido.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RegistrarUserComponent } from './pages/registrar-user/registrar-user.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';
import { appReducers } from './store/app.reducers';
import { EffectsArray } from './store/effects/index';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModificarComponent } from './pages/modificar/modificar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EspecificoComponent,
    HacerPedidoComponent,
    MenuComponent,
    RegistrarUserComponent,
    ModificarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
   // REDUX

   StoreModule.forRoot(appReducers),
   EffectsModule.forRoot(EffectsArray),
   StoreDevtoolsModule.instrument({
     maxAge: 25, // Retains last 25 states
     logOnly: environment.production, // Restrict extension to log-only mode
   }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
