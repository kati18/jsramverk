import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//The extension .ts is and should be left out in the imports below:
// import { AppComponent } from './app.component';
import { MeComponent } from './me/me.component';
import { ReportComponent } from './report/report.component';
import { ReportsComponent } from './reports/reports.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

/* Below tells the Router which view to display when a user clicks a link
or pastes a URL into the browser address bar.*/
const routes: Routes = [
    { path: 'reports', component: ReportsComponent },
    { path: 'reports/week/:week_no', component: ReportComponent },
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
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
