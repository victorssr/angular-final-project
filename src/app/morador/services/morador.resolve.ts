import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Morador } from './../models/morador';
import { MoradorService } from './morador.service';

@Injectable()
export class MoradorResolve implements Resolve<Morador> {

    constructor(private moradorService: MoradorService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.moradorService.obterMorador(route.params['id']);
    }

}