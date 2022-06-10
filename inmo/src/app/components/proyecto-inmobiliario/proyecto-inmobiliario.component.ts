import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { ProyectoInmobiliario } from 'src/app/models/proyecto-inmobiliario/proyecto-inmobiliario';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { ProyectoInmobiliarioService } from 'src/app/services/proyecto-inmobiliario/proyecto-inmobiliario.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Inversion } from 'src/app/models/inversion/inversion';
import { AvisoComponent } from '../aviso/aviso.component';
import { InversionService } from 'src/app/services/inversion/inversion.service';
import { EnumEstadoInversion, EnumEstadoInversionFunc } from 'src/app/models/enum/inversion/enum-estadoInversion';
import { EnumTipoInmuebleFunc } from 'src/app/models/enum/inmueble/enum-tipoInmueble';
import { DatePipe } from '@angular/common'




@Component({
  selector: 'app-proyecto-inmobiliario',
  templateUrl: './proyecto-inmobiliario.component.html',
  styleUrls: ['./proyecto-inmobiliario.component.sass']
})
export class ProyectoInmobiliarioComponent implements OnInit {
  @ViewChild(AvisoComponent)aviso:AvisoComponent;
  
  
  // Varaibles del proyecto
  pdfSrc = "";
  previsualizacion: any = null;
  @Input() proyecto: ProyectoInmobiliario = new ProyectoInmobiliario(
    0,0,0,0,0,0,0,"","",
  );
  minimoInvertible:number = 0;

  // Varaibles del modal
  show: boolean = false;
  currentNavigation: any = null;
  closeResult: string = '';

  funciones: EnumEstadoInversionFunc ;

  // Variables de nueva inversion
  nuevaInversion: Inversion = new Inversion(
    0, this.authService.getIdUsuario(), 0, 0, new Date(), "Esperando alcanzar objetivo inicial" , "", "", "", new Date()
  );

  // Paso 1º seleccion de cantidad
  cantidadisChecked = false;
  maximoInvertible: number = 0;

    // Paso 2º seleccion de cantidad
  contratoisChecked = false;

  //Errores y su información
  error: boolean = false;
  errorCantidad: boolean = false;
  errorContrato: boolean = false;
  inforError: string = "";

  constructor(private modalService: NgbModal, private sanitizer: DomSanitizer, private proyectoService: ProyectoInmobiliarioService, private authService: AuthService
    , private router: Router, private inversionService: InversionService,) {
    var aux = this.router.getCurrentNavigation()
    if (aux != null) {
      if (aux.extras.state != null) {
        this.currentNavigation = aux.extras.state
      }
    }
  }



  ngOnInit(): void {
    if (this.currentNavigation != null) {
      let objeto = this.currentNavigation as { proyecto: ProyectoInmobiliario };
      this.proyecto = objeto.proyecto as ProyectoInmobiliario;
      this.proyectoService.setProyectoLocalStorage(this.proyecto.idproyecto_inmobiliario.toString());
      this.pdfSrc = 'data:image/gif;base64,' + this.proyecto.doc_plusvalia
      this.maximoInvertible = this.proyecto.valor_total_proyecto - this.proyecto.sum_valores_aportados;
      this.calcularMinInvertible()
    } else {
      this.proyectoService.getProyecto(Number(this.proyectoService.getIdProyecto()))
        .subscribe(
          {
            next: (response: any) => {
              this.proyecto = response;
              this.pdfSrc = 'data:image/gif;base64,' + this.proyecto.doc_plusvalia
              this.maximoInvertible = this.proyecto.valor_total_proyecto - this.proyecto.sum_valores_aportados;
              this.calcularMinInvertible()
            },
            error: (error) => {
              this.aviso.openAvisoErrorInfo(error);
            }
          }
        );
    }
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
    this.nuevaInversion.contrato_participacion_cliente = btoa(binaryString);
  }

  downloadPdf(): void {
    const linkSource = 'data:application/pdf;base64,' + this.proyecto.doc_plusvalia;
    const downloadLink = document.createElement("a");
    const fileName = "DocPlusvalia_Proyecto_" + this.proyecto.idproyecto_inmobiliario + ".pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  calcularMinInvertible() {
    if(this.maximoInvertible < this.proyecto.valor_min_aportacion){
      this.minimoInvertible = this.maximoInvertible
    }else{
      this.minimoInvertible = this.proyecto.valor_min_aportacion
    }

  }

  calcularMaxInvertible() {
    this.proyectoService.getProyecto(this.proyecto.idproyecto_inmobiliario)
      .subscribe(
        {
          next: (response: any) => {
            this.proyecto = response;
            this.maximoInvertible = this.proyecto.valor_total_proyecto - this.proyecto.sum_valores_aportados;
            this.aceptarCantidad();
            this.calcularMinInvertible()
          },
          error: (error) => {
            this.aviso.openAvisoErrorInfo(error);
          }
        }
      );
  }

  reiniciarModal() {
    this.error = false;
    this.errorCantidad = false;
    this.errorContrato = false;
    this.inforError = "";
    this.cantidadisChecked = false;
    this.contratoisChecked = false;
    this.nuevaInversion.contrato_participacion_cliente = "";
  }

  aceptarCantidad() {
    if (this.nuevaInversion.cantidad > this.maximoInvertible) {
        this.nuevaInversion.cantidad = this.maximoInvertible
        this.error = true
        this.errorCantidad = true;
        this.inforError = "Tu inversión supera la cantidad maxima (€). El máximo invertible es: "+this.maximoInvertible;
        this.cantidadisChecked = false;
    }else{
      this.error = false;
      this.errorCantidad = false;
      this.inforError = "";
      this.cantidadisChecked = true;
    }
  }

  checkContrato(event:any){
    if(this.nuevaInversion.contrato_participacion_cliente === ""){
      this.error = true
      this.errorContrato = true;
      this.contratoisChecked = false;
      this.inforError = "No has firmado el contrato correctamente.";
    }else{
      this.error = false
      this.errorContrato = false;
      this.contratoisChecked = true;
      this.inforError = "";
      
    }
  }

  onSubmit() {
    this.nuevaInversion.proyecto_inmobiliario_idproyecto_inmobiliario = this.proyecto.idproyecto_inmobiliario;
    console.log(this.nuevaInversion.fecha_inversion)
    console.log(this.nuevaInversion.fecha_recibo)

    //this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.modalService.dismissAll();
    this.inversionService.addInversion(this.nuevaInversion)
    .subscribe(
      {
        next: (response: any) => {
          console.log(response)
        },
        error: (error) => {
//          this.aviso.openAvisoErrorInfo(error);
            const dato: NavigationExtras = {state: {error: error}};
            this.router.navigate(['/error'], dato);
        }
      }
    );
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    this.reiniciarModal()
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
