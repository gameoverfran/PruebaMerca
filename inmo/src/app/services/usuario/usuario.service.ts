import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorInfo } from 'src/app/models/errorInfo/errorInfo';
import { Usuario } from 'src/app/models/usuario/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl = environment.baseUrl


  constructor(private http:HttpClient) { }

  
  //TODO cambiar localhost por una url dinamica

  getUsuarios(): Observable<any>{
    //return this.http.get<Usuario[]>(this.url);
    let url=`${this.baseUrl}/get_usuarios.php`;
    return this.http.get(url)
    .pipe(retry(0), catchError(this.handleError));
    
    //console.log(this.http.get(url));
    //return this.usuarios;
  }

  getUsuario(idUsuario:number): Observable<any>{
    //return this.http.get<Usuario[]>(this.url);
    let url=`${this.baseUrl}/get_usuario.php?idusuario=${idUsuario}`;
    return this.http.get(url)
    .pipe(retry(0), catchError(this.handleError));
  }

  addUsuario(usuario:Usuario): Observable<any>{
    const headers = { 'Content-Type': 'application/json',}  
    const body=JSON.stringify(usuario);
    let url=`${this.baseUrl}/add_usuario.php`;
    return this.http.post(url,body)
    .pipe(retry(0), catchError(this.handleError));
  }

  handleError(error:any) {
    let errorMessage: ErrorInfo = new ErrorInfo("","");
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage.message = error.error.data;
    } else {
      // server-side error
      errorMessage.error_code = error.status;
      if(error.error != null){
        errorMessage.message = error.error.data;
      }else{
        errorMessage.message = error.statusText
      }
    }
  
    return throwError(() => {
        return errorMessage;
    });
  }
  
}
