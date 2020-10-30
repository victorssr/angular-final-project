import { Router } from '@angular/router';
import { LocalStorageUtils } from './../../utils/localstorage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html'
})
export class MenuLoginComponent {

  localStorage = new LocalStorageUtils();
  email: string;
  user: any;
  token: string;

  constructor(private router: Router) { }

  buscarUsuario(): boolean {
    this.user = this.localStorage.obterUsuario();
    this.token = this.localStorage.obterTokenUsuario();

    if (this.user) {
      this.email = this.user.email;
    }

    return this.token !== null;
  }

  logout() {
    this.localStorage.limparDadosLocaisUsuario();
    this.router.navigate(['/home']);
  }

}
