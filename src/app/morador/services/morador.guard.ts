import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { LocalStorageUtils } from './../../utils/localstorage';

@Injectable()
export class MoradorGuard implements CanActivate {

    localStorage = new LocalStorageUtils();

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.localStorage.obterTokenUsuario()) {
            this.router.navigate(['/account/login']);
        }

        const claimData = route.data[0];
        if (claimData) {
            if (claimData.claim) {
                const user = this.localStorage.obterUsuario();
                if (!user.claims) {
                    this.redirecionarSemPermissao();
                }

                const userClaim = user.claims.find(c => c.type === claimData.claim);
                if (!userClaim) {
                    this.redirecionarSemPermissao();
                }

                if (!userClaim.value.includes(claimData.value)) {
                    this.redirecionarSemPermissao();
                }
            }
        }

        return true;
    }

    redirecionarSemPermissao() {
        this.router.navigate(['/forbidden']);
    }
}