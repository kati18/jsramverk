import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, shareReplay } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import * as dayjs from 'dayjs';
import 'dayjs/locale/se';
import { GlobalConstants } from '../common/global-constants';

const baseUrl = GlobalConstants.apiBaseUrl;
// const baseUrl = 'http://localhost:1337/';

// @Injectable({
//     providedIn: 'root'
// })

export interface Login {
    data: {
        message: string;
        token: string;
        expiresIn: string;
    }; // alt:
    // data: any;
    errors: object; // alt.:
    // errors: {
    //     title: string;
    // }
    // res: object; // not neeeded it seems 201006 12.50
    // res: any;
}

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }

    login(formData): Observable<Login> {
        const headers = {'content-type': 'application/json'};

        console.log('Data2 i service-fil: ', formData);

      // this.http.post('http://localhost:1337/user/register', formData);
        return this.http.post<Login>(baseUrl + 'login', formData, {headers})
        // return this.http.post<Login>(baseUrl + 'login', formData, {'headers': headers})

        // All prints below work:
        // .pipe(tap(res => console.log('res: ', res)));
        // .pipe(tap(res => console.log('res.data: ', res.data)));
        // .pipe(tap(res => console.log('res.data.token: ', res.data.token)));

        // .pipe(tap(res => this.setSession(res))); //alt below which also seems to work:
        .pipe(tap(res => this.setSession(res)),
            shareReplay());
    }

    private setSession(authResult): void {
        dayjs.locale('se');
        // console.log('authResult: ', authResult);
        console.log('expiresIn från login.service.ts: ', authResult.data.expiresIn);

        // const expiresAt = dayjs().add(authResult.data.expiresIn, 'h');
        const expiresAt = dayjs().add(authResult.data.expiresIn, 'm');
        console.log('expiresAt: ', expiresAt);

        localStorage.setItem('id_token', authResult.data.token);
        const token = localStorage.getItem('id_token');
        console.log('token: ', token);

        // localStorage.setItem('expires_at', authResult.data.expiresIn);
        // let expiresIn = localStorage.getItem('expires_at');
        // console.log('expiresIn: ', expiresIn);

        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
        const logInExpiresAt = localStorage.getItem('expires_at');
        console.log('logInExpiresAt ', logInExpiresAt);
    }

    logOut(): void {
        console.log('Hej från logOut i login.service');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');

        const tokenAfterRemovalAndLogOut = localStorage.getItem('id_token');
        console.log('tokenAfterRemovalAndLogOut: ', tokenAfterRemovalAndLogOut);
    }

    public isLoggedIn(): boolean {
        return dayjs().isBefore(this.getExpiration());
    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    getExpiration(): any {
        dayjs.locale('se');
        const expiration = localStorage.getItem('expires_at');
        // console.log('expiration from getExpiration ', expiration);
        const expiresAt =  JSON.parse(expiration);
        // console.log('expiresAt from getExpiration ', expiresAt);
        return dayjs(expiresAt);

    /**Below in order to see if dayjs work. Formats the datetime to ISO standard
     * format. The code is also necessary for the button Get expiration date
     * and for the method getExpiration() in the component-file.:
     */
        // let sally = dayjs(expiresAt);
        // console.log("sally: ", sally);
        // return sally.format();
    }
}
