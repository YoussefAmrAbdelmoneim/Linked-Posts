import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { loggedGuard } from './core/guard/logged/logged.guard';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';

export const routes: Routes = [
    {path:'', component:AuthLayoutComponent,canActivate:[loggedGuard],children:[
        {path:'',redirectTo:'login',pathMatch:'full'},
        {path:'login',component:LoginComponent,title:"Login"},
        {path:"register",component:RegisterComponent,title:"Register"}
    ] },
    {path:'',component:MainLayoutComponent,canActivate:[authGuard],children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent,title:'Home'},
        {path:'user-info',component:UserInfoComponent,title:'Info'},
        {path:'change-password',component:ChangePasswordComponent,title:'Change Password'}
    ]},
];
