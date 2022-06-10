import { DecimalPipe } from '@angular/common';
import { Component, Directive, EventEmitter, Input, OnInit, Output, PipeTransform, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';

import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumTipoEdificacion, EnumTipoInmueble, EnumTipoTerreno } from 'src/app/models/enum/inmueble/enum-tipoInmueble';

import { Inmueble } from 'src/app/models/inmueble/inmueble';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { AvisoComponent } from '../aviso/aviso.component';


export type SortColumn = keyof Inmueble | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
@Directive({
  selector: 'th[sortableInmueble]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeaderInmueble {

  @Input() sortableInmueble: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sortInmueble = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sortInmueble.emit({column: this.sortableInmueble, direction: this.direction});
  }
}

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.sass']
})
export class InmueblesComponent implements OnInit {

  @ViewChild(AvisoComponent) aviso: AvisoComponent;

  enumTipoInmueble = EnumTipoInmueble;
  enumTipoEdificacion = EnumTipoEdificacion;
  enumTipoTerreno = EnumTipoTerreno;

  inmuebles: Inmueble[] = [];
  inmueblesJson: any;
  @ViewChildren(NgbdSortableHeaderInmueble) headers: QueryList<NgbdSortableHeaderInmueble> = new QueryList();
  inmuebles$: Observable<string> = new Observable();
  filter: FormControl = new FormControl('');
  page: number = 1;
  pageSize: number = 4;
  collectionSize: number = 0

  constructor(private inmuebleService:InmuebleService, pipe: DecimalPipe, private router:Router) {
    this.inmuebles$ = this.filter.valueChanges;
    this.inmuebles$.subscribe(x =>{
      this.inmuebles = this.search(x,pipe)
    })
   }

  ngOnInit(): void {
    this.inmuebleService.getInmuebles()
    .subscribe(
      /*(response) => {  
        console.log(response)
        this.inmueblesJson = response
        for(let i of response){
          this.inmuebles.push(<Inmueble>i);
        }
        this.collectionSize = this.inmuebles.length;
        this.refreshInmuebles();
      }*/
      {
        next: (response: any) => {    
          console.log(response)
          this.inmueblesJson = response
          for(let i of response){
            this.inmuebles.push(<Inmueble>i);
          }
          this.collectionSize = this.inmuebles.length;
          this.refreshInmuebles();
        },
        error: (error) => {
          //const dato: NavigationExtras = {state: {error: error}};
          //this.router.navigate(['/error'], dato);
          this.aviso.openAvisoErrorInfo(error);
        }

      }
      
    );
  }

  search(text: string, pipe: PipeTransform): Inmueble[] {
    this.inmuebles = this.inmueblesJson
    return this.inmuebles.filter(inmueble => {
      const term = text.toLowerCase();
      return pipe.transform(inmueble.idinmueble).includes(term)
          || pipe.transform(inmueble.valor).includes(term)
    })
  }

  refreshInmuebles() {
    this.inmuebles = this.inmueblesJson
      //.map((usuario:Usuario, i:number) => ({id: i + 1, ...this.usuariosJson}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  refreshInmueblesFilt() {
    this.inmuebles = this.inmuebles 
      //.map((usuario:Usuario, i:number) => ({id: i + 1, ...this.usuariosJson}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  onSort({column, direction}: SortEvent) {
    
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortableInmueble !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      //this.inmuebles = this.inmueblesJson;
      this.refreshInmuebles();
    } else {
      this.inmuebles = [...this.inmueblesJson].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
      });
      this.refreshInmueblesFilt();
    }
    //this.refreshUsuarios()

  }

  showInmueble(inmueble: Inmueble){
    //console.log(inmueble)
    const dato: NavigationExtras = {state: {inmueble: inmueble}};
    this.router.navigate(['/inmueble'], dato);
  }

}
