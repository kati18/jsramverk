import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // template: `<app-me></app-me>`,
  // alt below in combination with use of app.component.html:
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'me-angular';
// Below added as a test:
  reports = [
    {report: "Kmom01", week_no: "1"}
    // {report: "Kmom02", week_no: "2"},
    // {report: "Kmom03", week_no: "3"},
    // {report: "Kmom04", week_no: "4"},
    // {report: "Kmom05", week_no: "5"},
    // {report: "Kmom06", week_no: "6"},
    // {report: "Kmom10", week_no: "10"}
  ];
// End of test
}
