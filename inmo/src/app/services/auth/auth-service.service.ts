import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';
import { environment } from 'src/environments/environment';
import { ErrorInfo } from 'src/app/models/errorInfo/errorInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private isLogin:boolean = false
  roleAs: string | null = "";
  idusuario:string = "";
  state: boolean = false;


  baseUrl = environment.baseUrl

  constructor(private http:HttpClient) { }

  login(role: string, idusuario:string, token:string) {
    this.isLogin = true;
    this.roleAs = role;
    this.idusuario = idusuario;
    this.state = true;
    localStorage.setItem('ROLE', this.roleAs);
    localStorage.setItem('STATE', 'true');
    localStorage.setItem('IDUSUARIO', this.idusuario);
    localStorage.setItem('TOKEN', token);
    return of({ success: this.isLogin, role: this.roleAs });
  }

  logout() {
    this.isLogin = false;
    this.roleAs = '';
    this.state = false;
    localStorage.setItem('ROLE', '');
    localStorage.setItem('STATE', '');
    localStorage.setItem('USUARIO', '');
    localStorage.setItem('TOKEN', '');
    localStorage.clear();
    return of({ success: this.isLogin, role: '' });
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }

  getRole() {
    this.roleAs = localStorage.getItem('ROLE');
    return this.roleAs;
  }
  getIdUsuario() {
    const aux = localStorage.getItem('IDUSUARIO');
    if (aux == null || aux == ""){
      return -1
    }
    return Number(aux);
  }

  getUsuarioSesion(email: string, password: string): Observable<any>{
    let url=`${this.baseUrl}/iniciar_sesion.php?email=${email}&password=${password}`;
    return this.http.get(url)
  }
  
  getCerrarUsuarioSesion(): Observable<any>{
    let url=`${this.baseUrl}/cerrar_sesion.php?idusuario=${this.idusuario}`;
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
