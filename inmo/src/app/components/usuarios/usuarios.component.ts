import { Component, OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren, PipeTransform, ViewChild  } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AvisoComponent } from '../aviso/aviso.component';

export type SortColumn = keyof Usuario | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}




@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.sass']
})
export class UsuariosComponent implements OnInit {
  @ViewChild(AvisoComponent)aviso:AvisoComponent;
  usuarios: Usuario[] = [];
  usuariosJson: any;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> = new QueryList();
  usuarios$: Observable<string> = new Observable();
  filter: FormControl = new FormControl('');
  page: number = 1;
  pageSize: number = 4;
  collectionSize: number = 0

  constructor(private usuarioService:UsuarioService, pipe: DecimalPipe, private router:Router) {
    /*this.usuarios$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe)),
    );*/
    this.usuarios$ = this.filter.valueChanges;
    this.usuarios$.subscribe(x =>{
      this.usuarios = this.search(x,pipe)
      //this.refreshUsuarios()
    })
   }

  

  

  ngOnInit(): void {
    //this.usuarios = this.usuarioService.getUsuarios();
    this.usuarioService.getUsuarios()
    .subscribe(
      {
        next: (response: any) => {
          console.log(response)
            //console.log(response)
            //this.usuarios = response; 
            /*for(let user of response){
              let newUsuario = new Usuario(
                user.num_ident,
                user.nombre,
                user.apellido,
                user.email,
                user.telefono,
                user.password,
                user.fecha_registro,
                user.rol,
                user.nacionalidad,
                user.cp,
                user.provincia,
                user.poblacion,
                user.direccion,
                user.cuenta_suspendida,
                user.fecha_verificacion,
                user.verificado,
                user.dni_pasaporte_foto,
              );
              this.usuarios.push(newUsuario);
            }*/
            //console.log(response)
            //console.log("----------------------------")
            //console.log(response)
            //console.log("----------------------------")
            
            this.usuariosJson = response
            for(let i of response){
              this.usuarios.push(<Usuario>i);
            }
            this.collectionSize = this.usuarios.length;
            this.refreshUsuarios();
            
        },
        error: (error) => {
          //const dato: NavigationExtras = { state: { error: error } };
          //this.router.navigate(['/error'], dato);
          this.aviso.openAvisoErrorInfo(error);
        }
      }
    );
  }

  search(text: string, pipe: PipeTransform): Usuario[] {
    this.usuarios = this.usuariosJson
    return this.usuarios.filter(usuario => {
      const term = text.toLowerCase();
      return usuario.nombre.toLowerCase().includes(term)
          || usuario.apellido.toLowerCase().includes(term)
          || usuario.num_ident.toLowerCase().includes(term)
    })    
  }

  refreshUsuarios() {
    this.usuarios = this.usuariosJson
      //.map((usuario:Usuario, i:number) => ({id: i + 1, ...this.usuariosJson}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  //onSort({column, direction}: SortEvent) {
  onSort({column, direction}: SortEvent) {
    
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.usuarios = this.usuariosJson;
    } else {
      this.usuarios = [...this.usuariosJson].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
      });
    }
    //this.refreshUsuarios()

  }

  showUsuario(usuario:Usuario){
    const dato: NavigationExtras = {state: {usuario: usuario}};
    this.router.navigate(['/usuario'], dato);
  }
}
