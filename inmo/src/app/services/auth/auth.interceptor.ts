import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }



  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var aux = localStorage.getItem('TOKEN');
    
    if (aux == null || aux == "") {
      return next.handle(request);
    }
    const headers = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${aux}`)
    });
    return next.handle(headers);
  }
}

