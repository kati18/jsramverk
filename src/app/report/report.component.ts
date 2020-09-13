import { Component, OnInit } from '@angular/core';
// Below added as a test:
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// End of test

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    reportText = "Här är min text om kmom01";
    // Below added as a test instead of below:
    constructor (
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.reportText = "Här är min text om alla kmoms!"
    }
    // End of test

  // constructor() { }

  // ngOnInit(): void {
  // }

}
