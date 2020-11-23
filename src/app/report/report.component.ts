// Copy from register, to be edited:

import { Component, OnInit, AfterContentChecked, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { ReportService } from './report.service';
// import { MarkdownService } from 'ngx-markdown';
import {Router} from '@angular/router';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [ ReportService, LoginService ]
  // providers: [ ReportService, MarkdownService ]
})
export class ReportComponent implements OnInit, AfterContentChecked, OnDestroy {
    // kmom: string;
    // reportText = "";
    private subscription: any;
    // this form control(reportText) is registered to/assigned to the reportText input element in register.component.html,
    // the form control reportText is updated with the changes done in the input field for reportText in
    // register.component.html,
    // the form control reportText is an instance of the class FormControl and is saved as a class property of the
    // class ReportComponent.
    reportForm = new FormGroup ({
        kmom: new FormControl(''), // the class FormControl extends the class AbstractControl
        reportText: new FormControl('') // the class FormControl extends the class AbstractControl
    });
    errorMessage = '';
    successMessage = '';
    isLoggedIn: boolean;
    buttonDisabled = false;


    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private reportService: ReportService,
        private router: Router,
        private loginService: LoginService,
        // private markdownService: MarkdownService
    ) { }


    ngOnInit(): void {
        // 201007: Below code from efo and necessary if one changes one´s mind and
        // need/want to log in before being able to change a reporttext.:
        this.subscription = this.route.paramMap.subscribe(params => {
        // this.route.params.subscribe(params => {
            console.log('params: ', params);

            // const kmomValue = params.get('week_no');
            // this.reportForm.get('kmom').setValue(kmomValue);
            // alt.:
            this.reportForm.get('kmom').setValue(params.get('week_no'));

            console.log('Kmom: ', this.reportForm.get('kmom').value);

            this.reportService.fetchReport(this.reportForm.get('kmom').value)
                .subscribe((data) => {
                    // this.reportText = data.report_text;
                    // this.reportForm.get('reportText').setValue(data.report_text);
                    this.reportForm.get('reportText').setValue(data.data.data.report_text);

                    // this.reportText = this.markdownService.compile(data.report_text);
                    console.log('reportText: ', this.reportForm.get('reportText').value);
                    // console.log('Type of this.reportText: ', typeof this.reportText); //string
                },
                (error) => {
                    // console.log('error: ', error);
                    this.errorMessage = error.error.errors.title;
                    this.reportForm.get('reportText').setValue(error.error.errors.detail);
                    this.reportForm.get('reportText').disable();
                    this.buttonDisabled = true;
                    console.log('errorMessage: ', this.errorMessage);
                }
                );
        });

    }


    ngAfterContentChecked(): void {
        this.isLoggedIn = this.loginService.isLoggedIn();
    }

    // shorthand syntax, in order to get the value of kmom in report.component.html {{ kmom.value }}
    get kmom(): any { return this.reportForm.get('kmom'); }


    onSubmit(): void {

        // this.subscription = this.reportService.updateReport(this.reportForm.value)
        this.reportService.updateReport(this.reportForm.value)
        // this.reportService.updateReport(formData)
            .subscribe(
                (data) => {
                // console.log('data från report.comp.ts: ', data);
                // console.log('data.data: ', data.data);
                this.successMessage = data.data.message;
                console.log('successMessage: ', this.successMessage);
                // this.submitted = true;
                // console.log('data.data.token: ', data.data.token);
                this.router.navigate(['/reports']);
            },
                (error) => {
                    console.log('error: ', error);
                    this.errorMessage = error.error.errors.title;
                    console.log('errorMessage: ', this.errorMessage);
                }
            );

        // Manual redirection to route '/reports' as in app.component.html:
        // this.router.navigate(['/reports']);
    }

    // 201007: The function ngOnDestroy is needed for the onSubmit function but also for the ngOnInit
    // if one changes one´s mind and need/want to log in before being able to change a reporttext.:
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
