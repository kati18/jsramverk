import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportsService } from './reports.service';
import { LoginService } from '../login/login.service';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css'],
    providers: [ ReportsService, LoginService ]
})
export class ReportsComponent implements OnInit, OnDestroy {
    reportTexts: object; //an array object
    private subscription: any;
    isLoggedIn: boolean;

    constructor(
        private reportsService: ReportsService,
        private loginService: LoginService
    ) { }

    ngOnInit(): void {
        // this.reportsService.fetchReports()
        this.subscription = this.reportsService.fetchReports()
            .subscribe((data) => {
                // console.log("data från reports.component.ts: ", data);
                // console.log("data.data från reports.component.ts: ", data.data);
                this.reportTexts = data.data;
                console.log(this.reportTexts);
        });
        this.isLoggedIn = this.loginService.isLoggedIn();
    }

    ngAfterContentChecked() {
        this.isLoggedIn = this.loginService.isLoggedIn();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
