import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Inmueble } from 'src/app/models/inmueble/inmueble';
import { environment } from 'src/environments/environment';
import { ErrorInfo } from 'src/app/models/errorInfo/errorInfo';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  baseUrl = environment.baseUrl

  constructor(private http:HttpClient) { }


  getInmuebles(): Observable<any>{
    let url=`${this.baseUrl}/get_inmuebles.php`;
    return this.http.get(url)
    .pipe(retry(0), catchError(this.handleError));
  }

  getInmueblesDisponibles(): Observable<any>{
    let url=`${this.baseUrl}/get_inmuebles_disponibles.php`;
    return this.http.get(url)
    .pipe(retry(0), catchError(this.handleError));
  }

  getInmueble(idInmueble: number) : Observable<any>{
    let url=`${this.baseUrl}/get_inmueble.php?idinmueble=${idInmueble}`;
    return this.http.get(url)
    .pipe(retry(0), catchError(this.handleError));
  }

  addInmueble(inmueble: Inmueble): Observable<any> {
    const body=JSON.stringify(inmueble);
    console.log(inmueble)
    let url=`${this.baseUrl}/add_inmueble.php`;
    return this.http.post(url,body)
    .pipe(retry(0), catchError(this.handleError));
  }
  
  getIdInmueble() {
    var aux = localStorage.getItem('INMUEBLE');
    if (aux == null){
      return -1
    }
    return aux;
  }

  setInmuebleLocalStorage(idInmueble:string){
    localStorage.setItem('INMUEBLE', idInmueble);
  }

  getFotosInmueble(idInmueble: number) : Observable<any>{
    let url=`${this.baseUrl}/get_fotos_inmueble.php?idinmueble=${idInmueble}`;
    return this.http.get(url)
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


