import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AddInmuebleComponent } from './components/add-inmueble/add-inmueble.component';
import { AddProyectoInmobiliarioComponent } from './components/add-proyecto-inmobiliario/add-proyecto-inmobiliario.component';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { IndexComponent } from './components/index/index.component';
import { InmuebleComponent } from './components/inmueble/inmueble.component';
import { InmueblesComponent } from './components/inmuebles/inmuebles.component';
import { InversionesComponent } from './components/inversiones/inversiones.component';
import { MisInversionesComponent } from './components/mis-inversiones/mis-inversiones.component';
import { ProyectoInmobiliarioComponent } from './components/proyecto-inmobiliario/proyecto-inmobiliario.component';
import { ProyectosInmobiliariosComponent } from './components/proyectos-inmobiliarios/proyectos-inmobiliarios.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProyectoInmobiliario } from './models/proyecto-inmobiliario/proyecto-inmobiliario';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'home',
    component: IndexComponent
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path:'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['a']
    }
  },  
  {
    path:'inmuebles',
    component: InmueblesComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['a']
    }
  },
  {
    path:'inmueble',
    component: InmuebleComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['a']
    }
  },
  {
    path:'inmuebles/add',
    component: AddInmuebleComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['a']
    }
  },
  {
    path:'usuarios/add',
    component: AddUsuarioComponent,
  },
  {
    path:'proyectos/add',
    component: AddProyectoInmobiliarioComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['a']
    }
  },
  {
    path:'usuario',
    component: UsuarioComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['a','u']
    }
  },
  {
    path:'proyectos',
    component: ProyectosInmobiliariosComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['a','u']
    }
  },
  {
    path:'proyecto',
    component: ProyectoInmobiliarioComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['a','u']
    }
  },
  {
    path:'inversiones',
    component: InversionesComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['a']
    }
  },
  {
    path:'inversiones_personales',
    component: MisInversionesComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['a','u']
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
