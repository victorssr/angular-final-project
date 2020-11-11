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

    obterTodos(): Observable<Moradia[]> {
        return this.http
            .get<Moradia[]>(this.urlServiceV1 + 'casas', this.obterAuthHeaderJson())
            .pipe(catchError(this.serviceError));
    }

    obterPorId(id: string): Observable<Moradia> {
        return this.http
            .get<Moradia>(this.urlServiceV1 + 'casas/' + id, this.obterAuthHeaderJson())
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

    atualizar(moradia: Moradia): Observable<Moradia> {
        return this.http
            .put(this.urlServiceV1 + 'casas/' + moradia.id, moradia, this.obterAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

}