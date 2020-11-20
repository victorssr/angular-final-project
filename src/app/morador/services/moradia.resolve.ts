import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { MoradorService } from './morador.service';
import { Moradia } from './../models/morador';

@Injectable()
export class MoradiaResolve implements Resolve<Moradia[]> {

    constructor(private moradorService: MoradorService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.moradorService.obterMoradias();
    }

}