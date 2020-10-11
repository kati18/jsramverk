// the root and top level component of this app

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ LoginService ]
})
export class AppComponent {
    title = 'me-angular';
    isLoggedIn: boolean;

    constructor(
        private loginService: LoginService
    ) { }

    ngOnInit() {
        this.isLoggedIn = this.loginService.isLoggedIn();
    }

    ngAfterContentChecked() {
        this.isLoggedIn = this.loginService.isLoggedIn();
    }

    onLogout() {
        this.loginService.logOut();
        this.isLoggedIn = false;
    }

}
