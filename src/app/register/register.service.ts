import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

const baseUrl = GlobalConstants.apiBaseUrl;
// const baseUrl = 'http://localhost:1337/';


// @Injectable({
//   providedIn: 'root'
// })


export interface Registration {
    email: string; // not sure if needed, to be tested
    password: string;  // not sure if needed, to be tested
    // data: string;
    data: {
        status: number;
        type: string;
        message: string;
    };
    errors: object;
}

@Injectable()
export class RegisterService {

    constructor(private http: HttpClient) { }

    // private handleError(error: HttpErrorResponse) {
    //   if (error.error instanceof ErrorEvent) {
    //     // A client-side or network error occurred. Handle it accordingly.
    //     console.error('An error occurred:', error.error.message);
    //   } else {
    //     // The backend returned an unsuccessful response code.
    //     // The response body may contain clues as to what went wrong.
    //     console.error(
    //       `Backend returned code ${error.status}, ` +
    //       `body was: ${error.error}`);
    //   }
    //   // Return an observable with a user-facing error message.
    //   return throwError(
    //     'Something bad happened; please try again later.');
    // }

    register(formData): Observable<Registration> {
        const headers = {'content-type': 'application/json'};

        console.log('Data2 i service-fil: ', formData);

      // this.http.post('http://localhost:1337/user/register', formData);
        // return this.http.post<Registration>(baseUrl + 'register', formData, {'headers':headers});
        return this.http.post<Registration>(baseUrl + 'register', formData, {headers});
            // .pipe(
            //     catchError(this.handleError)
            // );
    }

}
