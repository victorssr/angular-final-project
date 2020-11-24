import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { BaseGuard } from './../../services/base.guard';

@Injectable()
export class MoradorGuard extends BaseGuard implements CanActivate {

    constructor(protected router: Router) { super(router); }

    canActivate(route: ActivatedRouteSnapshot) {
        return super.validaClaims(route);
    }

}