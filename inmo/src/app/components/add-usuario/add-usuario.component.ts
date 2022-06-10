import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { AvisoComponent } from '../aviso/aviso.component';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.sass']
})
export class AddUsuarioComponent implements OnInit {
  
  @ViewChild(AvisoComponent) aviso: AvisoComponent;
  public previsualizacion: any = null;
  public imgB64: any = null;
  public imgTipo: any = null;
  usuario = new Usuario(
    0, "", "", "", "", 0, "", new Date(), "", "", "", "", "", 0, "", 0, new Date(), 0
  );


  constructor(private sanitizer: DomSanitizer, private usuarioService:UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }


  
  onSubmit() {
    //const usuario = new Usuario();
    //console.log(this.usuario)
    //this.router.navigate(['/']);
    //console.log("asdasdasdasdasdas")
    //this.addUsuarioService.addUsuarios(this.usuario);
    this.usuarioService.addUsuario(this.usuario).subscribe(
      {
        next: (response: any) => {
          console.log(response);
        },
        error: (error) => {
          //const dato: NavigationExtras = { state: { error: error } };
          //this.router.navigate(['/error'], dato);
          this.aviso.openAvisoErrorInfo(error);
        }
      }
      );
  }

  onChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var files = event.target.files;
      var file = files[0];
      this.imgTipo = file.type;
      

      if (files && file) {
        var reader = new FileReader();
        reader.onload = this.handleFile.bind(this);
        reader.readAsBinaryString(file);
        reader = new FileReader();
        var aux;
        reader.onload = () => {
          aux = reader.result;          
       }
  
      }
      
      /*----------------
      const byteCharacters = atob(this.imgBtoa);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      this.usuario.dni_pasaporte_foto=  new Blob([byteArray], {type: this.imgTipo})
      --------------------*/
    }
  }
  handleFile(event: any) {
    var binaryString = event.target.result;
    this.imgB64 = btoa(binaryString);
    this.usuario.dni_pasaporte_foto = this.imgB64;
    this.previsualizacion = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + this.imgTipo + ';base64,' + this.imgB64);
  }

}
