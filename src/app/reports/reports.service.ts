import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';

const baseUrl = GlobalConstants.apiBaseUrl;
// const baseUrl = 'http://localhost:1337/';


// @Injectable({
//   providedIn: 'root'
// })

export interface Reports {
    // data: object;
    data: {
        status: number;
        type: string;
        message: string;
        data: object;
    };
}

@Injectable()
export class ReportsService {

    constructor(private http: HttpClient) { }

    fetchReports(): Observable<Reports> {
        return this.http.get<Reports>(baseUrl + 'reports');
    }
}
