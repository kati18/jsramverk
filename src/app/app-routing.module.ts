import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeComponent } from './me/me.component'; // the ext .ts is & should be left out
import { ReportComponent } from './report/report.component'; // the ext .ts is & should be left out

/* Below tells the Router which view to display when a user clicks a link
or pastes a URL into the browser address bar.*/
const routes: Routes = [
    // { path: 'reports/week/1', component: ReportComponent },
// Below added as a test:
    { path: 'reports/week/:week_no', component: ReportComponent },
// End of test:
    { path: '', component: MeComponent },
    { path: '**', component: MeComponent }
];

@NgModule({
/* The imports array is configured with the routes at the app´s root level.,
   The forRoot() method supplies the services and directives needed for routing.: */
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]// -> the AppRoutingModule becomes available throughout the app
})
export class AppRoutingModule { }
