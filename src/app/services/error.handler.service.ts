import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { LocalStorageUtils } from './../utils/localstorage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    localStorage = new LocalStorageUtils();

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    this.localStorage.limparDadosLocaisUsuario();
                    this.router.navigate(['/account/login'], { queryParams: { returnUrl: this.router.url } });
                }
                else if (error.status === 403) {
                    this.router.navigate(['/forbidden']);
                }
            }

            return throwError(error);
        }));
    }
}