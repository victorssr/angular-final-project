import { Moradia } from './../models/moradia';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CepBusca } from './../models/cep';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';


@Injectable()
export class CasaService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    buscarCep(cep: string): Observable<CepBusca> {
        return this.http
            .get<CepBusca>(`https://viacep.com.br/ws/${cep}/json/`, this.obterHeaderJson())
            .pipe(catchError(this.serviceError));
    }

    novaMoradia(moradia: Moradia): Observable<Moradia> {
        return this.http
            .post(this.urlServiceV1 + 'casas', moradia, this.obterAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

}