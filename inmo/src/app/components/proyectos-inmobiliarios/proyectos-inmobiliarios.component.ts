import { DecimalPipe } from '@angular/common';
import { Component, Directive, EventEmitter, Input, OnInit, Output, PipeTransform, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ProyectoInmobiliario } from 'src/app/models/proyecto-inmobiliario/proyecto-inmobiliario';
import { ProyectoInmobiliarioService } from 'src/app/services/proyecto-inmobiliario/proyecto-inmobiliario.service';
import { AvisoComponent } from '../aviso/aviso.component';

export type SortColumn = keyof ProyectoInmobiliario | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
@Directive({
  selector: 'th[sortableProyecto]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class NgbdSortableHeaderProyectoInmobiliario {

  @Input() sortableProyecto: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sortProyecto= new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sortProyecto.emit({ column: this.sortableProyecto, direction: this.direction });
  }
}

@Component({
  selector: 'app-proyectos-inmobiliarios',
  templateUrl: './proyectos-inmobiliarios.component.html',
  styleUrls: ['./proyectos-inmobiliarios.component.sass']
})
export class ProyectosInmobiliariosComponent implements OnInit {


  @ViewChild(AvisoComponent)aviso:AvisoComponent;
  proyectos: ProyectoInmobiliario[] = [];
  proyectosJson: any;
  @ViewChildren(NgbdSortableHeaderProyectoInmobiliario) headers: QueryList<NgbdSortableHeaderProyectoInmobiliario> = new QueryList();
  proyectos$: Observable<string> = new Observable();
  filter: FormControl = new FormControl('');
  page: number = 1;
  pageSize: number = 4;
  collectionSize: number = 0

  constructor(private proyectoService: ProyectoInmobiliarioService, pipe: DecimalPipe, private router: Router) {
    this.proyectos$.subscribe(x => {
      this.proyectos = this.search(x, pipe)
    })
  }



  ngOnInit(): void {
    this.proyectoService.getProyectos()
    .subscribe(
      {
        next: (response: any) => {
          console.log(response)
          this.proyectosJson = response
          for(let i of response){
            //console.log(i)
            this.proyectos.push(<ProyectoInmobiliario>i);
          }
          this.collectionSize = this.proyectos.length;
          this.refreshProyectos();
        },
        error: (error) => {
          //const dato: NavigationExtras = { state: { error: error } };
          //this.router.navigate(['/error'], dato);
          this.aviso.openAvisoErrorInfo(error);
        }
      }

    );
  }

  search(text: string, pipe: PipeTransform): ProyectoInmobiliario[] {
    this.proyectos = this.proyectosJson
    return this.proyectos.filter(proyecto => {
      const term = text.toLowerCase();
      return pipe.transform(proyecto.idproyecto_inmobiliario).includes(term)
    })
  }

  refreshProyectos() {
    this.proyectos = this.proyectosJson
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  onSort({column, direction}: SortEvent) {
    
    this.headers.forEach(header => {
      if (header.sortableProyecto !== column) {
        header.direction = '';
      }
    });

    if (direction === '' || column === '') {
      this.proyectos = this.proyectosJson;
    } else {
      this.proyectos = [...this.proyectosJson].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
      });
    }
  }

  showProyecto(proyecto: ProyectoInmobiliario){
    const dato: NavigationExtras = {state: {proyecto: proyecto}};
    this.router.navigate(['/proyecto'], dato);
  }
}
