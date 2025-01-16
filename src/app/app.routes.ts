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
import { PapeletasComponent } from './mainpages/papeletas/papeletas.component';
import { ActasComponent } from './mainpages/actas/actas.component';
import { InscripcionesComponent } from './mainpages/inscripciones/inscripciones.component';
import { UsuariosComponent } from './mainpages/usuarios/usuarios.component';
import { TerritoriosComponent } from './mainpages/territorios/territorios.component';
import { CargarterritorioComponent } from './mainpages/cargarterritorio/cargarterritorio.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgotpassword', component: ForgotpasswordComponent },
    { path: 'recoverycode', component: RecoverycodeComponent },
    { path: 'changepassword', component: ChangepasswordComponent },
    {
        path: '', component: MainpageComponent,
        children: [
            { path: 'controlelectoral', component: ControlelectoralComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'actas', component: ActasComponent },
            { path: 'inscripciones', component: InscripcionesComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'territorios', component: TerritoriosComponent },
            { path: 'territorios/carga-territorial', component: CargarterritorioComponent },
            { path: 'papeletas', component: PapeletasComponent },
            { path: 'dignidades-consultas', component: DignidadesConsultasComponent },
            { path: 'bajomantenimiento', component: UndermaintenanceComponent },
            { path: '', redirectTo: '/controlelectoral', pathMatch: 'full' }
        ]
    }
];
