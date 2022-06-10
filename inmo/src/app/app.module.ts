import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader, UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BooleanFiltroComponent } from './filtros/boolean-filtro/boolean-filtro.component';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { InmueblesComponent, NgbdSortableHeaderInmueble } from './components/inmuebles/inmuebles.component';
import { InmuebleComponent } from './components/inmueble/inmueble.component';
import { AddInmuebleComponent } from './components/add-inmueble/add-inmueble.component';
import { IndexComponent } from './components/index/index.component';
import { ProyectosInmobiliariosComponent, NgbdSortableHeaderProyectoInmobiliario } from './components/proyectos-inmobiliarios/proyectos-inmobiliarios.component';
import { ProyectoInmobiliarioComponent } from './components/proyecto-inmobiliario/proyecto-inmobiliario.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AddProyectoInmobiliarioComponent } from './components/add-proyecto-inmobiliario/add-proyecto-inmobiliario.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { MatListModule } from '@angular/material/list';
import { InversionComponent } from './components/inversion/inversion.component';
import { InversionesComponent, NgbdSortableHeaderInversion } from './components/inversiones/inversiones.component';
import { MisInversionesComponent } from './components/mis-inversiones/mis-inversiones.component';
import { AvisoComponent } from './components/aviso/aviso.component';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    UsuariosComponent,
    UsuarioComponent,
    NgbdSortableHeader,
    NgbdSortableHeaderInmueble,
    NgbdSortableHeaderProyectoInmobiliario,
    NgbdSortableHeaderInversion,
    BooleanFiltroComponent,
    AddUsuarioComponent,
    LoginComponent,
    InmueblesComponent,
    InmuebleComponent,
    AddInmuebleComponent,
    IndexComponent,
    ProyectosInmobiliariosComponent,
    ProyectoInmobiliarioComponent,
    ErrorPageComponent,
    AddProyectoInmobiliarioComponent,
    InversionComponent,
    InversionesComponent,
    MisInversionesComponent,
    AvisoComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule ,
    HttpClientModule,
    CommonModule,
    PdfViewerModule,
    MatListModule,
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
