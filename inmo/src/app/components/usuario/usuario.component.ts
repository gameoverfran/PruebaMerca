import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';
import { EventEmitter } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { Navigation, NavigationCancel, NavigationExtras, Router } from '@angular/router';
import { AvisoComponent } from '../aviso/aviso.component';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.sass']
})

export class UsuarioComponent implements OnInit {
  @ViewChild(AvisoComponent)aviso:AvisoComponent;
  previsualizacion: any = null;
  show: boolean = false;
  currentNavigation: any = null;

  @Input() usuario: Usuario = new Usuario(
    0,
    "",
    "",
    "",
    "",
    0,
    "",
    new Date(),
    "",
    "",
    "",
    "",
    "",
    0,
    "",
    0,
    new Date(),
    0,
  );
  //USUARIO: Usuario[]=[];
  @Output() deleteItem: EventEmitter<Usuario> = new EventEmitter();
  @Output() toggleItem: EventEmitter<Usuario> = new EventEmitter();


  constructor(private sanitizer: DomSanitizer, private usuarioService: UsuarioService, private authService: AuthService
    , private router: Router) {
    var aux = this.router.getCurrentNavigation()
    if (aux != null) {
      if (aux.extras.state != null) {
        this.currentNavigation = aux.extras.state
      }

    }
  }

  ngOnInit(): void {

    if (this.currentNavigation != null) {
      let objeto = this.currentNavigation as { usuario: Usuario };
      this.usuario = objeto.usuario as Usuario;
      this.previsualizacion = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this.usuario.dni_pasaporte_foto);
    } else {
      this.usuarioService.getUsuario(this.authService.getIdUsuario())
        .subscribe(
          {
            next: (response: any) => {
              console.log(response)
                    this.usuario = response;
                    this.previsualizacion = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this.usuario.dni_pasaporte_foto);
            },
            error: (error) => {
              //const dato: NavigationExtras = { state: { error: error } };
              //this.router.navigate(['/error'], dato);
              this.aviso.openAvisoErrorInfo(error);
            }
          }
        );
    }

  }

  onDelete(usuario: Usuario) {
    this.deleteItem.emit(usuario);
  }

  onToggle(usuario: Usuario) {
    if (usuario.verificado == 1) {
      usuario.verificado = 0;
    } else {
      usuario.verificado = 1;
    }
    this.toggleItem.emit(usuario);
  }

  password() {
    this.show = !this.show;
  }

}
