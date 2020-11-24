import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageUtils } from './../utils/localstorage';

export abstract class BaseGuard {
    private localStorage = new LocalStorageUtils();

    constructor(protected router: Router) { }

    protected validaClaims(route: ActivatedRouteSnapshot): boolean {
        if (!this.localStorage.obterTokenUsuario()) {
            this.router.navigate(['/account/login'], { queryParams: { returnUrl: this.router.url } });
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

    private redirecionarSemPermissao() {
        this.router.navigate(['/forbidden']);
    }

}