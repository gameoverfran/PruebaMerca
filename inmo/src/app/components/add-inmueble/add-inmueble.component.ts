import { forEach } from '@angular-devkit/schematics';
import { formatDate } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnumTipoEdificacion, EnumTipoInmueble, EnumTipoInmuebleFunc, EnumTipoTerreno } from 'src/app/models/enum/inmueble/enum-tipoInmueble';
import { ErrorInfo } from 'src/app/models/errorInfo/errorInfo';
import { Inmueble } from 'src/app/models/inmueble/inmueble';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { AvisoComponent } from '../aviso/aviso.component';

@Component({
  selector: 'app-add-inmueble',
  templateUrl: './add-inmueble.component.html',
  styleUrls: ['./add-inmueble.component.sass']
})
export class AddInmuebleComponent implements OnInit {
  
  @ViewChild(AvisoComponent) aviso: AvisoComponent;
  model!: NgbDateStruct;
  date!: { year: number; month: number; };


  enumTipoInmueble = EnumTipoInmueble;
  enumTipoEdificacion = EnumTipoEdificacion;
  enumTipoTerreno = EnumTipoTerreno;

  enumTipoInmuebleFunc: EnumTipoInmuebleFunc = new EnumTipoInmuebleFunc();

  //tipoInmueble: EnumTipoInmueble = EnumTipoInmueble.noTipo;
  //tipoEdificacion: EnumTipoEdificacion = EnumTipoEdificacion.noTipo;
  //tipoTerreno: EnumTipoTerreno = EnumTipoTerreno.noTipo;

  public previsualizacion: any = null;
  public imgB64: any = null;
  public imgTipo: any = null;
  //fotosList: Array<String> = [];
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
    "noTipo",
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

  constructor(private sanitizer: DomSanitizer, private inmuebleService: InmuebleService, private authService: AuthService, private router: Router, ) { }

  ngOnInit(): void {
    this.inmueble.usuario_idusuario = this.authService.getIdUsuario()
  }



  onSubmit() {
    console.log(this.inmueble.fecha_construccion)
    this.inmuebleService.addInmueble(this.inmueble).subscribe(
      {
        next: (response: any) => {
          console.log(response);
        },
        error: (error) => {
          this.aviso.openAvisoErrorInfo(error);
        }
      }
    );
  }

  onChange(event: any) {
    this.inmueble.fotosList = new Array<String>();
    if (event.target.files) {
      var files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        var file = files[i];

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

      }

    }
  }

  handleFile(event: any) {

    var binaryString = event.target.result;

    this.inmueble.fotosList.push(btoa(binaryString))
  }



  selectChangeHandlerTipoInmueble(event: any) {
    this.inmueble.tipo = event.target.value
    switch (this.inmueble.tipo) {
      case this.enumTipoInmueble.Edificacion:
        this.inmueble.tipo_terreno = this.enumTipoTerreno.NoTipo
        break
      case this.enumTipoInmueble.Terreno:
        this.inmueble.tipo_edificacion = this.enumTipoEdificacion.NoTipo
        break
      default:
        this.inmueble.tipo_terreno = this.enumTipoTerreno.NoTipo
        this.inmueble.tipo_edificacion = this.enumTipoEdificacion.NoTipo
        break
    }
  }

  selectChangeHandlerTipoEdificacion(event: any) {
    this.inmueble.tipo_edificacion = event.target.value;
  }

  selectChangeHandlerTipoTerreno(event: any) {
    this.inmueble.tipo_terreno = event.target.value;
  }

  selectChangeHandlerAmueblado(event: any) {
    switch (event.target.value) {
      case "0":
        this.inmueble.amueblado = 0
        break
      case "1":
        this.inmueble.amueblado = 1
        break
      default:
        this.inmueble.amueblado = 0
        break
    }
  }
  visibleSubmit() {
    return (this.inmueble.tipo === this.enumTipoInmueble.Edificacion && this.inmueble.tipo_edificacion !== this.enumTipoEdificacion.NoTipo) || this.inmueble.tipo === this.enumTipoInmueble.Terreno
  }


}