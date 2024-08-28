import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component-lists/login/login.component'; 
import { RegisterComponent } from './component-lists/register/register.component';
import { RegisterconfirmationComponent } from './component-lists/registerconfirmation/registerconfirmation.component';
import { HomeComponent } from './component-lists/home/home.component';
import { OrganizationComponent } from './component-lists/organization/organization.component';
import { CategoryComponent } from './component-lists/category/category.component';
import { ServicesComponent } from './component-lists/services/services.component';
import { CustomersComponent } from './component-lists/customers/customers.component';
import { UserDeatilsComponent } from './component-lists/user-deatils/user-deatils.component';
import { UpdateUsersComponent } from './component-lists/update-users/update-users.component';
import { UpdateCategoryComponent } from './component-lists/update-category/update-category.component';
import { UpdateOrganizationComponent } from './component-lists/update-organization/update-organization.component';
import { UpdateServiceComponent } from './component-lists/update-service/update-service.component';
import { UpdateCustomerComponent } from './component-lists/update-customer/update-customer.component';
import { ViewUsersComponent } from './component-lists/view-users/view-users.component';
import { ViewCategoryComponent } from './component-lists/view-category/view-category.component';
import { ViewOrganizationComponent } from './component-lists/view-organization/view-organization.component';
import { ViewServiceceComponent } from './component-lists/view-servicece/view-servicece.component';
import { ViewCustomerComponent } from './component-lists/view-customer/view-customer.component';
import { AddCategoryComponent } from './component-lists/add-category/add-category.component';
import { AddServicesComponent } from './component-lists/add-services/add-services.component';
import { AddCustomersComponent } from './component-lists/add-customers/add-customers.component';
import { AddOrganizationComponent } from './component-lists/add-organization/add-organization.component';
import { ChangepasswordComponent } from './component-lists/changepassword/changepassword.component';
import { ForgetpasswordComponent } from './component-lists/forgetpassword/forgetpassword.component';
import { ProfileComponent } from './component-lists/profile/profile.component';
import { AuthguardGuard } from './authguard.guard';

const routes: Routes = [
  // {path:'**',redirectTo:'home',pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'register', component:RegisterComponent},
  {path:'registerconfirm', component: RegisterconfirmationComponent},
  { path: 'home', component:HomeComponent, canActivate:[AuthguardGuard] },
  { path:'user-details', component:UserDeatilsComponent, canActivate:[AuthguardGuard] },
  { path:'org', component:OrganizationComponent, canActivate:[AuthguardGuard] },
  { path:'category', component:CategoryComponent, canActivate:[AuthguardGuard] },
  { path:'service', component:ServicesComponent, canActivate:[AuthguardGuard] },
  { path:'customer', component:CustomersComponent, canActivate:[AuthguardGuard] },
  { path:'update-users/:id', component:UpdateUsersComponent, canActivate:[AuthguardGuard] },
  { path:'update-category/:categoryId', component:UpdateCategoryComponent, canActivate:[AuthguardGuard] },
  { path:'update-org/:companyId', component:UpdateOrganizationComponent, canActivate:[AuthguardGuard] },
  { path:'update-service/:serviceId', component:UpdateServiceComponent, canActivate:[AuthguardGuard] },
  { path:'update-customer/:customerId', component:UpdateCustomerComponent, canActivate:[AuthguardGuard] },
  { path:'view-users/:id', component:ViewUsersComponent, canActivate:[AuthguardGuard] },
  { path:'view-category/:categoryId', component:ViewCategoryComponent, canActivate:[AuthguardGuard] },
  { path:'view-org/:companyId', component:ViewOrganizationComponent, canActivate:[AuthguardGuard] },
  { path:'view-service/:serviceId', component:ViewServiceceComponent, canActivate:[AuthguardGuard] },
  { path:'view-customer/:customerId', component:ViewCustomerComponent, canActivate:[AuthguardGuard] },
  { path:'add-category', component:AddCategoryComponent, canActivate:[AuthguardGuard] },
  { path:'add-service', component:AddServicesComponent, canActivate:[AuthguardGuard] },
  { path:'add-customers', component:AddCustomersComponent, canActivate:[AuthguardGuard] },
  {path: 'add-org', component:AddOrganizationComponent, canActivate:[AuthguardGuard]},
  {path: 'changepassword', component:ChangepasswordComponent, canActivate:[AuthguardGuard]},
  {path: 'forgetpassword', component:ForgetpasswordComponent},
  {path: 'profile/:id', component:ProfileComponent, canActivate:[AuthguardGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
