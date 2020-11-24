import { CanDeactivate } from '@angular/router';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { BaseGuard } from './../../services/base.guard';
import { NovoComponent } from '../novo/novo.component';

@Injectable()
export class CasaGuard extends BaseGuard implements CanActivate, CanDeactivate<NovoComponent> {

    constructor(protected router: Router) { super(router); }

    canDeactivate(component: NovoComponent) {
        if (component.alteracaoNaoSalva) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
        }

        return true;
    }

    canActivate(route: ActivatedRouteSnapshot) {
        return super.validaClaims(route);
    }

}