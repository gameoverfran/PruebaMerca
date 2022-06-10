import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorInfo } from 'src/app/models/errorInfo/errorInfo';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.sass']
})
export class ErrorPageComponent implements OnInit {
  error: ErrorInfo = new ErrorInfo("???","Press F to pay respects");
  currentNavigation: any = null;
  constructor(private router:Router) {
    var aux =this.router.getCurrentNavigation()
    if( aux != null){
      if(aux.extras.state != null){
        this.currentNavigation = aux.extras.state
        
      }
    }
   }

  ngOnInit(): void {
    if( this.currentNavigation != null){
      
      let objeto= this.currentNavigation as {error: ErrorInfo}; 
      this.error = objeto.error as ErrorInfo
      //console.log(this.error)
      //this.mensaje = this.error.message
      
    }
  }

}
