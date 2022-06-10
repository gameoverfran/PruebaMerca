import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Inversion } from 'src/app/models/inversion/inversion';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { InversionService } from 'src/app/services/inversion/inversion.service';
import { AvisoComponent } from '../aviso/aviso.component';

@Component({
  selector: 'app-mis-inversiones',
  templateUrl: './mis-inversiones.component.html',
  styleUrls: ['./mis-inversiones.component.sass']
})
export class MisInversionesComponent implements OnInit {
  @ViewChild(AvisoComponent) aviso: AvisoComponent;
  inversiones: Inversion[] = [];
  inversionesJson: any;
  constructor(private inversionService: InversionService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.inversionService.getInversionesUsuario(Number(this.authService.getIdUsuario))
    .subscribe(
      {
        next: (response: any) => {    
          this.inversionesJson = response
          for(let i of response){
            this.inversiones.push(<Inversion>i);
          }
        },
        error: (error) => {
          //const dato: NavigationExtras = {state: {error: error}};
          //this.router.navigate(['/error'], dato);
          this.aviso.openAvisoErrorInfo(error);
        }
      }
    );
  }

}
