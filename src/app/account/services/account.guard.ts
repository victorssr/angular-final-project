import { LocalStorageUtils } from './../../utils/localstorage';
import { Injectable } from "@angular/core";
import { CanDeactivate, CanActivate, Router } from "@angular/router";
import { RegisterComponent } from "../register/register.component";

@Injectable()
export class AccountGuard implements CanDeactivate<RegisterComponent>, CanActivate {

    localStorage = new LocalStorageUtils();

    constructor(private router: Router) { }

    canDeactivate(component: RegisterComponent) {
        if (component.alteracaoNaoSalva) {
            return window.confirm("Deseja realmente sair do formulário? Todas as informações serão perdidas.");
        }

        return true;
    }

    canActivate() {
        if (this.localStorage.obterTokenUsuario()) {
            this.router.navigate(["/home"]);
        }

        return true;
    }

}