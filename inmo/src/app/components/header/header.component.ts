import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  role = ""

  constructor(  private authService: AuthService) { }

  ngOnInit(): void {
    var aux =this.authService.getRole()
    if (aux != null){
      this.role = aux
    }
  }

}
