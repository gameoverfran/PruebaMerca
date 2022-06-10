import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { Inmueble } from 'src/app/models/inmueble/inmueble';
import { ProyectoInmobiliario } from 'src/app/models/proyecto-inmobiliario/proyecto-inmobiliario';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { ProyectoInmobiliarioService } from 'src/app/services/proyecto-inmobiliario/proyecto-inmobiliario.service';
import { AvisoComponent } from '../aviso/aviso.component';

@Component({
  selector: 'app-add-proyecto-inmobiliario',
  templateUrl: './add-proyecto-inmobiliario.component.html',
  styleUrls: ['./add-proyecto-inmobiliario.component.sass']
})
export class AddProyectoInmobiliarioComponent implements OnInit {

  @ViewChild(AvisoComponent) aviso: AvisoComponent;
  pdfSrc: any = "";
  previsualizacion: string = "";
  doc_plusvalia: any = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  proyecto: ProyectoInmobiliario = new ProyectoInmobiliario(
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    "",
    "",
    //new Blob()
  );

  selectedOptions: number[] = [];
  selectedInmueblesId: number[] = [];
  inmuebles: Inmueble[] = [];
  inmueblesJson: any;

  constructor(private sanitizer: DomSanitizer, private proyectoService: ProyectoInmobiliarioService, private router: Router, private inmuebleService: InmuebleService ) { }

  ngOnInit(): void { 
    this.inmuebleService.getInmueblesDisponibles()
    .subscribe(
      {
        next: (response: any) => {    
          //console.log(response)
          this.inmueblesJson = response
          for(let i of response){
            this.inmuebles.push(<Inmueble>i);
          }
          //this.collectionSize = this.inmuebles.length;
          //this.refreshInmuebles();*/
        },
        error: (error) => {
          //const dato: NavigationExtras = {state: {error: error}};
          //this.router.navigate(['/error'], dato);
          this.aviso.openAvisoErrorInfo(error);
        }

      }
      
    );
  }

  onSubmit() {

    this.proyectoService.addProyecto(this.proyecto, this.selectedInmueblesId).subscribe(
      {
        next: (response: any) => {
          console.log(response)
        },
        error: (error) => {
          //console.log(error);
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

  handleFile(event: any) {
    var binaryString = event.target.result;
    this.doc_plusvalia = btoa(binaryString);
    this.proyecto.doc_plusvalia = this.doc_plusvalia;
    this.pdfSrc = 'data:image/gif;base64,' + this.doc_plusvalia
  }

  selectChangeHandlerActivo(event: any) {
    switch (event.target.value) {
      case "0":
        this.proyecto.proyecto_activo = 0
        break
      case "1":
        this.proyecto.proyecto_activo = 1
        break
      default:
        this.proyecto.proyecto_activo = 0
        break
    }
  }

  onNgModelChange(event: any){
    var aux = 0;
    this.selectedInmueblesId = []
    for (let i = 0; i < event.length; i++) {
      this.selectedInmueblesId.push(event[i]["idinmueble"])
      aux = aux + Number(event[i]["valor"])
    }
    this.proyecto.valor_total_proyecto = aux;
   
  }

}
