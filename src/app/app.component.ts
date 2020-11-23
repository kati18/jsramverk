// the root and top level component of this app

import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ LoginService ]
})
export class AppComponent implements OnInit, AfterContentChecked {
    title = 'me-angular';
    isLoggedIn: boolean;

    constructor(
        private loginService: LoginService
    ) { }

    ngOnInit(): void {
        this.isLoggedIn = this.loginService.isLoggedIn();
    }

    ngAfterContentChecked(): void {
        this.isLoggedIn = this.loginService.isLoggedIn();
    }

    onLogout(): void {
        this.loginService.logOut();
        this.isLoggedIn = false;
    }

}
