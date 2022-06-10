import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  closeResult: string = '';
  email: string = '';
  password: string = '';
  error: boolean = false;
  constructor(private modalService: NgbModal, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.getUsuarioSesion(this.email, this.password)
      .subscribe(
        {
          next: (response: any) => {
            this.error = false;
            this.authService.login(response.rol, response.idusuario, response.token)
            window.location.reload();
            this.router.navigate(['/home']);
            this.modalService.dismissAll();
          },
          error: (error) => {
            this.error = true;
          }
        }
      );
  }

  logout() {
    this.error = false;
    this.authService.logout();
    window.location.reload();
    this.router.navigate(['/home']);
  }

  goUsuarioAdd() {
    this.error = false;
    this.modalService.dismissAll();
    this.router.navigate(['/usuarios/add']);
  }

  getIsLoggedIn() {
    return this.authService.isLoggedIn();
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}


