import { CasaService } from './casa.service';
import { Moradia } from './../models/moradia';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class CasaResolve implements Resolve<Moradia> {

    constructor(private casaService: CasaService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.casaService.obterPorId(route.params['id']);
    }

}