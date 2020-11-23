import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {} // Not sure if needed???

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('id_token');
    // const idToken = "nutestarviomdettablirratttextsomochomdeninfogasiheadernparequesten";

    if (idToken) {
        const cloned = req.clone({
            // headers: req.headers.set("Authorization", "Bearer " + idToken)
            headers: req.headers.set('Authorization', idToken)
        });
        return next.handle(cloned);

    } else {
        return next.handle(req);
        }
    }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
