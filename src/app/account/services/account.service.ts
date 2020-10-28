import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Usuario } from './../models/usuario';
import { BaseService } from '../../services/base.service';


@Injectable()
export class AccountService extends BaseService {
    constructor(private http: HttpClient) { super(); }

    registrarUsuario(usuario: Usuario) : Observable<Usuario> {
        let response = this.http.post(this.urlServiceV1 + 'register', usuario, this.obterHeaderJson())
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        );

        return response;
    }

    login(usuario: Usuario) {
        
    }
}