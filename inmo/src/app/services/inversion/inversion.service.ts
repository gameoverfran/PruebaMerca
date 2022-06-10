import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ErrorInfo } from 'src/app/models/errorInfo/errorInfo';
import { Inversion } from 'src/app/models/inversion/inversion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InversionService {

  baseUrl = environment.baseUrl
  
  constructor(private http: HttpClient) { }

  getInversiones(): Observable<any> {
    let url = `${this.baseUrl}/get_inversiones.php`;
    return this.http.get(url)
      .pipe(retry(0), catchError(this.handleError));
  }

  getInversionesUsuario(idUsuario:number): Observable<any> {
    let url = `${this.baseUrl}/get_inversiones_usuario.php?idusuario=${idUsuario}`;
    return this.http.get(url)
      .pipe(retry(0), catchError(this.handleError));
  }

  addInversion(inversion:Inversion): Observable<any> {
    const body=JSON.stringify(inversion);
    let url=`${this.baseUrl}/add_inversion.php`;
    return this.http.post(url,body)
    .pipe(retry(0), catchError(this.handleError));;
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
