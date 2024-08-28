import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component-lists/login/login.component';
import { RegisterComponent } from './component-lists/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterconfirmationComponent } from './component-lists/registerconfirmation/registerconfirmation.component';
import { HomeComponent } from './component-lists/home/home.component';
import { NavbarComponent } from './component-lists/navbar/navbar.component';
import { HeaderComponent } from './component-lists/header/header.component';
import { FooterComponent } from './component-lists/footer/footer.component';
import { OrganizationComponent } from './component-lists/organization/organization.component';
import { CategoryComponent } from './component-lists/category/category.component';
import { ServicesComponent } from './component-lists/services/services.component';
import { CustomersComponent } from './component-lists/customers/customers.component';
import { UserDeatilsComponent } from './component-lists/user-deatils/user-deatils.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Jwtinterceptor } from './classes/jwtinterceptor';
import { UpdateUsersComponent } from './component-lists/update-users/update-users.component';
import { UpdateOrganizationComponent } from './component-lists/update-organization/update-organization.component';
import { UpdateCategoryComponent } from './component-lists/update-category/update-category.component';
import { UpdateCustomerComponent } from './component-lists/update-customer/update-customer.component';
import { ViewCustomerComponent } from './component-lists/view-customer/view-customer.component';
import { ViewCategoryComponent } from './component-lists/view-category/view-category.component';
import { ViewOrganizationComponent } from './component-lists/view-organization/view-organization.component';
import { ViewUsersComponent } from './component-lists/view-users/view-users.component';
import { UpdateServiceComponent } from './component-lists/update-service/update-service.component';
import { ViewServiceceComponent } from './component-lists/view-servicece/view-servicece.component';
import { AddCustomersComponent } from './component-lists/add-customers/add-customers.component';
import { AddServicesComponent } from './component-lists/add-services/add-services.component';
import { AddCategoryComponent } from './component-lists/add-category/add-category.component';
import { AddOrganizationComponent } from './component-lists/add-organization/add-organization.component';
import { ChangepasswordComponent } from './component-lists/changepassword/changepassword.component';
import { ForgetpasswordComponent } from './component-lists/forgetpassword/forgetpassword.component';
import { DeletedataComponent } from './component-lists/deletedata/deletedata.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './component-lists/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterconfirmationComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    OrganizationComponent,
    CategoryComponent,
    ServicesComponent,
    CustomersComponent,
    UserDeatilsComponent,
    UpdateUsersComponent,
    UpdateOrganizationComponent,
    UpdateCategoryComponent,
    UpdateCustomerComponent,
    ViewCustomerComponent,
    ViewCategoryComponent,
    ViewOrganizationComponent,
    ViewUsersComponent,
    UpdateServiceComponent,
    ViewServiceceComponent,
    AddCustomersComponent,
    AddServicesComponent,
    AddCategoryComponent,
    AddOrganizationComponent,
    ChangepasswordComponent,
    ForgetpasswordComponent,
    DeletedataComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Jwtinterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
