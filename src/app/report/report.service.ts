import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Test 200928 - seems to work...:
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
// End of test 200928

const baseUrl = 'http://localhost:1337/';

// @Injectable({
//   providedIn: 'root'
// })

/** Defines an interface with the required properties in order to
 * specify the response object type:
*/
export interface Report { // defines the type of the response
// defines the properties of the response object and the types of the response values:
    week_no: number;
    report_text: string;
    // report_text: any;
    // data: object;
}

/** Specifies the response object type (note: the object is just av plain object
 * that can not automatically be converted into an instance of a class) and
 * defines an interface with the required properties
*/

export interface ReportText {
    data: string;
    errors: object;
}

@Injectable()
export class ReportService {

    constructor(private http: HttpClient) { }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // Return an observable with a user-facing error message.
      return throwError(
        'Something bad happened; please try again later.');
    }

    fetchReport(kmom) {
        // returns an observable of Report
        return this.http.get<Report>(baseUrl + "reports/week/" + kmom);
    }


    updateReport(formData): Observable<ReportText> {
        const headers = {'content-type': 'application/json'};

        console.log("Data2 i service-fil: ", formData);
        // returns an observable of ReportText:
        // return this.http.put<ReportText>(baseUrl + "reports/week", data, {'headers':headers})
        return this.http.post<ReportText>(baseUrl + 'reports', formData, {'headers':headers});
            // .pipe(
            //     catchError(this.handleError)
            // );
    }
}
