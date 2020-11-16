import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Morador, Moradia } from './../models/morador';
import { BaseService } from '../../services/base.service';

@Injectable()
export class MoradorService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    obterTodos(): Observable<Morador[]> {
        return this.http.get(this.urlServiceV1 + 'moradores', this.obterAuthHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    obterMoradias(): Observable<Moradia[]> {
        return this.http
            .get<Moradia[]>(this.urlServiceV1 + 'casas', this.obterAuthHeaderJson())
            .pipe(catchError(this.serviceError));
    }

}