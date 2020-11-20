import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Morador, Moradia } from './../models/morador';
import { BaseService } from '../../services/base.service';

@Injectable()
export class MoradorService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterMoradias(): Observable<Moradia[]> {
        return this.http
            .get<Moradia[]>(this.urlServiceV1 + 'casas', this.obterAuthHeaderJson())
            .pipe(catchError(this.serviceError));
    }

    obterTodos(): Observable<Morador[]> {
        return this.http.get<Morador[]>(this.urlServiceV1 + 'moradores', this.obterAuthHeaderJson())
            .pipe(catchError(this.serviceError));
    }

    obterMorador(id: string): Observable<Morador> {
        return this.http
            .get<Morador>(this.urlServiceV1 + 'moradores/' + id, this.obterAuthHeaderJson())
            .pipe(catchError(this.serviceError));
    }

    cadastrar(morador: Morador): Observable<Morador> {
        return this.http
            .post(this.urlServiceV1 + 'moradores', morador, this.obterAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    atualizar(morador: Morador): Observable<Morador> {
        return this.http
            .put(this.urlServiceV1 + 'moradores/' + morador.id, morador, this.obterAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

}