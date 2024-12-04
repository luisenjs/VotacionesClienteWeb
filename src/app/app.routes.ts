import { Routes } from '@angular/router';
import { LoginComponent } from './sessionpages/login/login.component';
import { ForgotpasswordComponent } from './sessionpages/forgotpassword/forgotpassword.component';
import { RecoverycodeComponent } from './sessionpages/recoverycode/recoverycode.component';
import { ChangepasswordComponent } from './sessionpages/changepassword/changepassword.component';
import { MainpageComponent } from './mainpages/mainpage/mainpage.component';
import { ControlelectoralComponent } from './mainpages/controlelectoral/controlelectoral.component';
import { DashboardComponent } from './mainpages/dashboard/dashboard.component';
import { UndermaintenanceComponent } from './mainpages/undermaintenance/undermaintenance.component';
import { LandingComponent } from './sessionpages/landing/landing.component';
import { SignupComponent } from './sessionpages/signup/signup.component';
import { DignidadesConsultasComponent } from './mainpages/dignidades-consultas/dignidades-consultas.component';

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
            { path: 'dignidades-consultas', component: DignidadesConsultasComponent},
            { path: 'bajomantenimiento', component: UndermaintenanceComponent},
            { path: '', redirectTo: '/controlelectoral', pathMatch: 'full'}
        ]
    }
];
