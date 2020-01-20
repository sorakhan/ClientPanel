// To create this module
// ng g m app-routing --flat --module=app --spec=false
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddClientFormComponent } from './components/add-client-form/add-client-form.component';
import { EditClientFormComponent } from './components/edit-client-form/edit-client-form.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]}, 
  {path: 'login', component: LoginComponent}, 
  {path: 'register', component: RegisterComponent}, 
  {path: 'client/add', component: AddClientFormComponent, canActivate: [AuthGuard]}, 
  {path: 'client/edit/:id', component: EditClientFormComponent, canActivate: [AuthGuard]}, 
  {path: 'client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard]}, 
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]}, 
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
