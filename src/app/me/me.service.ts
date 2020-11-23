import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';

const baseUrl = GlobalConstants.apiBaseUrl;
// const baseUrl = 'http://localhost:1337/';

// @Injectable({
//   providedIn: 'root'
// })

// export interface Me {
//     data: object; // an array object
// }

export interface Me {
    data: {
        data: object; // an array object
    };
}


@Injectable()
export class MeService {

    constructor(private http: HttpClient) { }

    fetchMe(): Observable<Me> {
        // return this.http.get<Me>('http://localhost:1337/');
        return this.http.get<Me>(baseUrl);
    }
}
