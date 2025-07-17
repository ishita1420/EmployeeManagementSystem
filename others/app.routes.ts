
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectEmployeeComponent } from './project-employee/project-employee.component';
import { ProjectComponent } from './project/project.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { MastercomponentComponent } from './mastercomponent/mastercomponent.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path:'',component:FirstpageComponent},
    {
        path: '',
        component: MastercomponentComponent,
        children: [
          { path: 'home', component: HomeComponent },
          {path:'employee',component:EmployeeComponent},
          {path:'project-employee',component:ProjectEmployeeComponent},
          {path:'project',component:ProjectComponent},
       
        ]
      },
    
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
    
  
    

    

];
