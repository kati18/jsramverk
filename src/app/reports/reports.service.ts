import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:1337/';

// @Injectable({
//   providedIn: 'root'
// })

export interface Reports {
    data: object;
}

@Injectable()
export class ReportsService {

    constructor(private http: HttpClient) { }

    fetchReports() {
        return this.http.get<Reports>(baseUrl + 'reports');
    }
}
