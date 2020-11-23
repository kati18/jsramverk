import { Component, OnInit, AfterContentChecked } from '@angular/core';
// import of ngModel directives from the Angular Forms Module:
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit, AfterContentChecked {
    loginForm = new FormGroup({
    // this form control(e_mail) is registered to/assigned to the e-mail input element in login.component.html,
    // the form control e-mail is updated with the changes done in the input field for e-mail in
    // login.component.html:
        email: new FormControl(''), // the class FormControl extends the class AbstractControl
        password: new FormControl('')
    });
    errorMessage = '';
    successMessage = '';
    submitted = false;
    isLoggedIn: boolean;

    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
        console.warn(this.loginForm.value);
        console.log(this.loginForm.value);
        const formData = this.loginForm.value;
        console.log(formData.email);

        this.loginService.login(this.loginForm.value)
            .subscribe(
                (data) => {
                // console.log("data från login.comp.ts: ", data);
                console.log('data.data.message: ', data.data.message);
                this.successMessage = data.data.message;
                // console.log('successMessage: ', this.successMessage);
                this.submitted = true;
                // this.router.navigate(['/']);
                // console.log('data.data.token: ', data.data.token);
            },
                (error) => {
                    // console.log('error: ', error);
                    this.errorMessage = error.error.errors.title;
                    console.log('errorMessage: ', this.errorMessage);
                }
            );
    }

    // getExpiration() {
    //     this.expiration = this.loginService.getExpiration();
    // }

    ngAfterContentChecked(): void {
        this.isLoggedIn = this.loginService.isLoggedIn();
    }
}
