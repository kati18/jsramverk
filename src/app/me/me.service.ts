import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:1337/';

// @Injectable({
//   providedIn: 'root'
// })

export interface Me {
    data: object;
}

@Injectable()
export class MeService {

    constructor(private http: HttpClient) { }

    fetchMe() {
        // return this.http.get<Me>('http://localhost:1337/');
        return this.http.get<Me>(baseUrl);
    }
}
