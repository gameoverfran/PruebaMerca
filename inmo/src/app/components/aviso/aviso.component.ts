import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { ErrorInfo } from 'src/app/models/errorInfo/errorInfo';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.scss']
})
export class AvisoComponent implements OnInit , OnDestroy {

  codeError = "???";
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('aviso destruido')
  }

  @ViewChild('aviso') aviso: any;
  
  private onClose = new Subject<any>()
  onClose$ = this.onClose.asObservable()

  private avisoRef!: NgbModalRef;
  msgAviso = ''

  fran(){
    console.log("fran")
  }

  openAviso(raz:string,op:NgbModalOptions={}): void {
    op.container='#aviso'
    op.centered=true
    this.msgAviso=raz
    this.avisoRef=this.modalService.open(this.aviso, op);
    this.avisoRef.result.then(
      (result) => {
        console.log('Aviso OK')
        console.log(result)
        this.onClose.next(true)
      },
      (reason) => {
        console.log('Aviso dismis');
        console.log(reason)
        this.onClose.next(false)
      });
  }

  openAvisoErrorInfo(raz:ErrorInfo,op:NgbModalOptions={}): void {
    op.container='#aviso'
    op.centered=true
    this.msgAviso=raz.message
    this.codeError = raz.error_code
    this.avisoRef=this.modalService.open(this.aviso, op);
    this.avisoRef.result.then(
      (result) => {
        console.log('Aviso OK')
        console.log(result)
        this.onClose.next(true)
      },
      (reason) => {
        console.log('Aviso dismis');
        console.log(reason)
        this.onClose.next(false)
      });
  }

  closeAviso() {
    this.avisoRef.close();
  }

}
