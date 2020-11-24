import { CanDeactivate } from '@angular/router';
import { Router } from '@angular/router';
import { LocalStorageUtils } from './../../utils/localstorage';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { NovoComponent } from '../novo/novo.component';


@Injectable()
export class CasaGuard implements CanActivate, CanDeactivate<NovoComponent> {

    localStorage = new LocalStorageUtils();

    constructor(private router: Router) { }

    canDeactivate(component: NovoComponent) {
        if (component.alteracaoNaoSalva) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
        }

        return true;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.localStorage.obterTokenUsuario()) {
            this.router.navigate(['/account/login'], { queryParams: { returnUrl: this.router.url } });
        }

        const claimData = route.data[0];

        if (claimData.claim) {
            const user = this.localStorage.obterUsuario();
            if (!user.claims) {
                this.redirecionaAcessoNegado();
            }

            const userClaim = user.claims.find(c => c.type === claimData.claim);
            if (!userClaim) {
                this.redirecionaAcessoNegado();
            }

            const userClaimValue = userClaim.value as string;
            if (!userClaimValue.includes(claimData.value)) {
                this.redirecionaAcessoNegado();
            }
        }

        return true;
    }

    redirecionaAcessoNegado() {
        this.router.navigate(['/forbidden']);
    }
}