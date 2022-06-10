import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ErrorInfo } from 'src/app/models/errorInfo/errorInfo';
import { ProyectoInmobiliario } from 'src/app/models/proyecto-inmobiliario/proyecto-inmobiliario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoInmobiliarioService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  getProyectos(): Observable<any> {
    let url = `${this.baseUrl}/get_proyectos.php`;
    return this.http.get(url)
      .pipe(retry(0), catchError(this.handleError));
  }

  getProyecto(idProyecto: number): Observable<any> {
    let url = `${this.baseUrl}/get_proyecto.php?idproyecto=${idProyecto}`;
    return this.http.get(url)
      .pipe(retry(0), catchError(this.handleError));
  }

  setProyectoLocalStorage(idProyecto: string) {
    console.log(idProyecto)
    localStorage.setItem('PROYECTO', idProyecto);
  }

  getIdProyecto() {
    var aux = localStorage.getItem('PROYECTO');
    if (aux == null) {
      return -1
    }
    return aux;
  }



  addProyecto(proyecto: ProyectoInmobiliario, selectedId: number[]): Observable<any> {
    var myJsonObject = JSON.parse(JSON.stringify(proyecto));
    myJsonObject.idinmuebles = selectedId;
    const body = JSON.stringify(myJsonObject);
    let url = `${this.baseUrl}/add_proyecto.php`;
    //console.log(myJsonObject)
    return this.http.post(url, body)
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
