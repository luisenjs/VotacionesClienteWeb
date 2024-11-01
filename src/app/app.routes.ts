import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RecoverycodeComponent } from './recoverycode/recoverycode.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ControlelectoralComponent } from './controlelectoral/controlelectoral.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UndermaintenanceComponent } from './undermaintenance/undermaintenance.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    { path: '', component: LandingComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent },
    { path: 'forgotpassword', component: ForgotpasswordComponent },
    { path: 'recoverycode', component: RecoverycodeComponent },
    { path: 'changepassword', component: ChangepasswordComponent },
    {
        path: '', component: MainpageComponent,
        children: [
            { path: 'controlelectoral', component: ControlelectoralComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'bajomantenimiento', component: UndermaintenanceComponent},
            { path: '', redirectTo: '/controlelectoral', pathMatch: 'full'}
        ]
    }
];
