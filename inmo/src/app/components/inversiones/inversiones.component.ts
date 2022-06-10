import { DecimalPipe } from '@angular/common';
import { Component, Directive, EventEmitter, Input, OnInit, Output, PipeTransform, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Inversion } from 'src/app/models/inversion/inversion';
import { InversionService } from 'src/app/services/inversion/inversion.service';
import { AvisoComponent } from '../aviso/aviso.component';

export type SortColumn = keyof Inversion | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
@Directive({
  selector: 'th[sortableInversion]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})


export class NgbdSortableHeaderInversion {

  @Input() sortableInversion: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sortInversion= new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sortInversion.emit({ column: this.sortableInversion, direction: this.direction });
  }
}

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.component.html',
  styleUrls: ['./inversiones.component.sass']
})
export class InversionesComponent implements OnInit {

  @ViewChild(AvisoComponent) aviso: AvisoComponent;
  inversiones: Inversion[] = [];
  inversionesJson: any;
  @ViewChildren(NgbdSortableHeaderInversion) headers: QueryList<NgbdSortableHeaderInversion> = new QueryList();
  inversiones$: Observable<string> = new Observable();
  filter: FormControl = new FormControl('');
  page: number = 1;
  pageSize: number = 4;
  collectionSize: number = 0

  constructor(private inversionService: InversionService, pipe: DecimalPipe, private router: Router) { 
    this.inversiones$.subscribe(x => {
      this.inversiones = this.search(x, pipe)
    })
  }

  ngOnInit(): void {
    this.inversionService.getInversiones()
    .subscribe(
      {
        next: (response: any) => {    
          console.log(response)
          this.inversionesJson = response
          for(let i of response){
            this.inversiones.push(<Inversion>i);
          }
          this.collectionSize = this.inversiones.length;
          this.refreshInversiones();
        },
        error: (error) => {
          const dato: NavigationExtras = {state: {error: error}};
          this.router.navigate(['/error'], dato);
          //this.aviso.openAvisoErrorInfo(error);
        }
      }
    );
  }


  search(text: string, pipe: PipeTransform): Inversion[] {
    this.inversiones = this.inversionesJson
    return this.inversiones.filter(inversion => {
      const term = text.toLowerCase();
      return pipe.transform(inversion.idinversion).includes(term) 
    })
  }

  refreshInversiones() {
    this.inversiones = this.inversionesJson
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  onSort({column, direction}: SortEvent) {
    
    this.headers.forEach(header => {
      if (header.sortableInversion !== column) {
        header.direction = '';
      }
    });

    if (direction === '' || column === '') {
      this.inversiones = this.inversionesJson;
    } else {
      this.inversiones = [...this.inversionesJson].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
      });
    }
  }

  showInversion(inversion: Inversion){
    const dato: NavigationExtras = {state: {inversion: inversion}};
    this.router.navigate(['/inversion'], dato);
  }


}
