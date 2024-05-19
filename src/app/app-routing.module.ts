import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginComponent }, // Menu route
  { path: 'menu', component: MenuComponent }, // Menu route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
