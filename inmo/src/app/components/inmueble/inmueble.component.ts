import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Inmueble } from 'src/app/models/inmueble/inmueble';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { EnumTipoInmuebleFunc } from 'src/app/models/enum/inmueble/enum-tipoInmueble';
import { EnumTipoInmueble } from 'src/app/models/enum/inmueble/enum-tipoInmueble';
import { EnumTipoEdificacion } from 'src/app/models/enum/inmueble/enum-tipoInmueble';
import { EnumTipoTerreno } from 'src/app/models/enum/inmueble/enum-tipoInmueble';
import { NavigationExtras, Router } from '@angular/router';
import { AvisoComponent } from '../aviso/aviso.component';

@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.component.html',
  styleUrls: ['./inmueble.component.sass']
})
export class InmuebleComponent implements OnInit {

  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  @ViewChild(AvisoComponent) aviso: AvisoComponent;

  images : Array<SafeResourceUrl> = [];

  idInmueble: number = 4;
  
  enumTipoInmuebleFunc: EnumTipoInmuebleFunc = new EnumTipoInmuebleFunc();

  enumTipoInmueble = EnumTipoInmueble;
  enumTipoEdificacion = EnumTipoEdificacion;
  enumTipoTerreno = EnumTipoTerreno;
  
  currentNavigation: any = null;
  @Input() inmueble: Inmueble = new Inmueble(
    0,
    0,
    0,
    0,
    "",
    0,
    "",
    "",
    "",
    "",
    "",
    0,
    "",
    "",
    new Date(),
    "",
    "",
    "",
    "",
    "",
    "",
    0,
    "",
    "",
    "",
    0,
    0,
    0,
    0,
    0,
    "",
    0
  );

  constructor(private sanitizer: DomSanitizer, private inmuebleService: InmuebleService, private authService: AuthService, private router:Router) { 
    var aux =this.router.getCurrentNavigation()
    if( aux != null){
      if(aux.extras.state != null){
        this.currentNavigation = aux.extras.state
        
      }
    }
  }

  ngOnInit(): void {
    if( this.currentNavigation != null){
      
      let objeto= this.currentNavigation as {inmueble: Inmueble};      
      this.inmueble = objeto.inmueble as Inmueble;
      this.inmuebleService.setInmuebleLocalStorage(this.inmueble.idinmueble.toString());
      this.inmuebleService.getFotosInmueble(Number(this.inmueble.idinmueble))
      .subscribe(
        {
          next: (response: any) => {
            for (let i = 0; i < response.length; i++) {
              this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + response[i]["foto"]))
            }
          },
          error: (error) => {
            //const dato: NavigationExtras = {state: {error: error}};
            //this.router.navigate(['/error'], dato);
            this.aviso.openAvisoErrorInfo(error);
          }
        });
      //this.previsualizacion = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this.usuario.dni_pasaporte_foto);
    }else{
    this.inmuebleService.getInmueble(Number(this.inmuebleService.getIdInmueble()))
      .subscribe(
        {
          next: (response: any) => {
                this.inmueble = response;
                this.inmuebleService.getFotosInmueble(Number(this.inmueble.idinmueble))
                .subscribe(
                  {
                    next: (response: any) => {
                      for (let i = 0; i < response.length; i++) {
                        this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + response[i]["foto"]))
                      }
                    },
                    error: (error) => {
                      //const dato: NavigationExtras = {state: {error: error}};
                      //this.router.navigate(['/error'], dato);
                      this.aviso.openAvisoErrorInfo(error);
                    }
                  });
          },
          error: (error) => {
            //const dato: NavigationExtras = {state: {error: error}};
            //this.router.navigate(['/error'], dato);
            this.aviso.openAvisoErrorInfo(error);
          }
        }
      );
    }
  }
}
