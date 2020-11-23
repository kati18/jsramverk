import { Component, OnInit } from '@angular/core';

// import of ngModel directives from the Angular Forms Module:
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { FormGroup, FormControl, Validators } from '@angular/forms';???
import {Router} from '@angular/router';

import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ RegisterService ]
})
export class RegisterComponent implements OnInit {
    registerForm = new FormGroup({
    // this form control(e_mail) is registered to/assigned to the e-mail input element in register.component.html,
    // the form control e-mail is updated with the changes done in the input field for e-mail in
    // register.component.html:
        email: new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]), // the class FormControl extends the class AbstractControl
        password: new FormControl('', Validators.required)
    });
    katja: object;
    errorMessage = '';
    successMessage = '';
    submitted = false;

    constructor(
        private registerService: RegisterService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    get email(): any { return this.registerForm.get('email'); }// ???

    get password(): any { return this.registerForm.get('password'); }// ???

    onSubmit(): void {
        // console.warn(this.registerForm.value);
        // console.log(this.registerForm.value);
        // console.log(this.registerForm.get('email').value);
        // console.log(this.registerForm.get('password').value);
        const formData = this.registerForm.value;
        console.log(formData.email);

        this.registerService.register(this.registerForm.value)
            .subscribe(
                (data) => {
                this.successMessage = data.data.message;
                console.log('successMessage: ', this.successMessage);
                this.submitted = true;
                // this.router.navigate(['/login']);
            },
                (error) => {
                    console.log('error: ', error);
                    this.errorMessage = error.error.errors.title;
                    console.log('errorMessage: ', this.errorMessage);
                }
            );

        // Manual redirection to route "/" as in app.component.html:
        // this.router.navigate(['/']);
    }

}
