import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EspecificoComponent } from './pages/especifico/especifico.component';
import { HacerPedidoComponent } from './pages/hacer-pedido/hacer-pedido.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RegistrarUserComponent } from './pages/registrar-user/registrar-user.component';
import { ModificarComponent } from './pages/modificar/modificar.component';

// Todas las rutas con sus componentes respectivos

const routes: Routes = [

    { path: '', redirectTo: '/dashboard', pathMatch: 'full'  },
    { path: 'dashboard', component: DashboardComponent  },
    { path: 'modify/:id', component: ModificarComponent  },
    { path: 'especifico', component: EspecificoComponent  },
    { path: 'hacer', component: HacerPedidoComponent  },
    { path: 'menu', component: MenuComponent  },
    { path: 'register', component: RegistrarUserComponent  },


];

@NgModule({
    declarations: [],
    imports : [
        RouterModule.forRoot(routes)
    ],
exports: [ RouterModule]
})

export class AppRoutingModule{}