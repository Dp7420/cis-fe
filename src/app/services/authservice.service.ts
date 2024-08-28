import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../classes/user-details';
import { Observable } from 'rxjs';
import { Customers } from '../classes/customers';
import { Users } from '../component-lists/login/login.component';
import { Category } from '../classes/category';
import { Services } from '../classes/services';
import { Organization } from '../classes/organization';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  private baseURL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  IsAuthentication() {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }

  //login
  login(request: Users): Observable<Object> {
    return this.http.post<object>(`${this.baseURL}/auth/login`, request);
  }

  //change password
  emailValidation(email: String): Observable<any> {
    return this.http.post(
      `${this.baseURL}/user/verifyEmail?email=${email}`,
      null
    );
  }

  sendPasswordResetOTP(email: String): Observable<any> {
    return this.http.post(
      `${this.baseURL}/user/requestOtp?email=${email}`,
      null
    );
  }

  VerifyOtp(email: String, otp: String): Observable<any> {
    return this.http.post(
      `${this.baseURL}/user/verifyOtp?email=${email}&otp=${otp}`,
      null
    );
  }

  changepassword(
    email: String,
    otp: String,
    newPassword: String
  ): Observable<any> {
    return this.http.post(
      `${this.baseURL}/user/changePassword?email=${email}&otp=${otp}&newPassword=${newPassword}`,
      null
    );
  }

  //register organization

  getAllOrganizationDetails(): Observable<Organization[]> {
    return this.http.get<Organization[]>(`${this.baseURL}/auth/com/fetchall`);
  }

  getOrganizationBy(id: number): Observable<Organization> {
    return this.http.get<Organization>(
      `${this.baseURL}/auth/com/fetchbyid/${id}`
    );
  }

  //Registration
  register(user: UserDetails): Observable<Object> {
    return this.http.post<Object>(`${this.baseURL}/auth/register`, user);
  }

  // createCompany(company: Organization): Observable<object>{
  //   return this.http.post<object>(`${this.baseURL}/auth/com/save`, company);
  // }

  // getAllCompanies() : Observable<Organization[]>{
  //   return this.http.get<Organization[]>(`${this.baseURL}/auth/com/fetchall`);
  // }

  // getcompanyById(id: number): Observable<Organization>{
  //   return this.http.get<Organization>(`${this.baseURL}/auth/com/fetchbyid/${id}`);
  // }

  //Admin
  retriveAdminbyId(id: number): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.baseURL}/admin/getbyid/${id}`);
  }

  // User API

  retrieveByRoleAdmin(role: String): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(
      `${this.baseURL}/user/getall/all?role=${role}`
    );
  }

  retriveUserbyId(id: number): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.baseURL}/user/getbyid/${id}`);
  }

  updateUser(id: number, userdata: UserDetails): Observable<object> {
    return this.http.put<object>(
      `${this.baseURL}/admin/update/${id}`,
      userdata
    );
  }

  deleteUser(id: number): Observable<Object> {
    return this.http.delete<object>(`${this.baseURL}/admin/deletebyid/${id}`);
  }

  approveUser(id: number): Observable<Object> {
    return this.http.post<object>(`${this.baseURL}/admin/approve/${id}`, {});
  }

  rejectUser(id: number): Observable<Object> {
    return this.http.post<object>(`${this.baseURL}/admin/reject/${id}`, {});
  }

  // Customer API

  saveCustomer(customer: Customers): Observable<object> {
    return this.http.post<object>(
      `${this.baseURL}/admin/customer/save`,
      customer
    );
  }

  // addServicesToCustomer(id: number, service: Services[]): Observable<Object>{
  //   return this.http.post<Object>(`${this.baseURL}/admin/${id}/services`, service)
  // }

  addServicesToCustomer(
    customerId: number,
    serviceIds: number[]
  ): Observable<Customers> {
    const body = { serviceIds };
    return this.http.post<Customers>(
      `${this.baseURL}/admin/${customerId}/services`,
      body
    );
  }

  upadateCustomerDetails(id: number, customer: Customers): Observable<object> {
    return this.http.put<object>(
      `${this.baseURL}/admin/customer/updatebyid/${id}`,
      customer
    );
  }

  deleteCustomers(id: number): Observable<object> {
    return this.http.delete<object>(
      `${this.baseURL}/admin/customer/deletebyid/${id}`
    );
  }

  getAllCustomers(): Observable<Customers[]> {
    return this.http.get<Customers[]>(`${this.baseURL}/user/customer/fetchall`);
  }

  getCustomersById(id: number): Observable<Customers> {
    return this.http.get<Customers>(
      `${this.baseURL}/user/customer/fetchbyid/${id}`
    );
  }

  //categories API
  getAllCategorys(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.baseURL}/user/categories/fetchall`
    );
  }
  addCategory(category: Category): Observable<object> {
    return this.http.post<object>(
      `${this.baseURL}/admin/category/save`,
      category
    );
  }
  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(
      `${this.baseURL}/user/category/fetchbyid/${categoryId}`
    );
  }
  updateCategory(categoryId: number, category: Category): Observable<object> {
    return this.http.put<object>(
      `${this.baseURL}/admin/category/update/${categoryId}`,
      category
    );
  }
  deleteCategory(categoryId: number): Observable<object> {
    return this.http.delete<object>(
      `${this.baseURL}/admin/category/delete/${categoryId}`
    );
  }

  //services API
  getAllservice(): Observable<Services[]> {
    return this.http.get<Services[]>(`${this.baseURL}/user/service/fetchall`);
  }
  addService(service: Services): Observable<object> {
    return this.http.post<object>(
      `${this.baseURL}/admin/service/save`,
      service
    );
  }
  getServiceById(serviceId: number): Observable<Services> {
    return this.http.get<Services>(`${this.baseURL}/user/service/${serviceId}`);
  }
  updateService(serviceId: number, service: Services): Observable<object> {
    return this.http.put<object>(
      `${this.baseURL}/admin/service/services/${serviceId}`,
      service
    );
  }
  deleteService(serviceId: number): Observable<object> {
    return this.http.delete<object>(
      `${this.baseURL}/admin/service/${serviceId}`
    );
  }

  getServiceByCategoryId(categoryId: number): Observable<Services> {
    return this.http.get<Services>(
      `${this.baseURL}/user/service/category/${categoryId}`
    );
  }

  //organization
  saveOrganization(organization: Organization): Observable<object> {
    return this.http.post<object>(
      `${this.baseURL}/admin/company/save`,
      organization
    );
  }

  upadateOrganization(
    id: number,
    organization: Organization
  ): Observable<object> {
    return this.http.put<object>(
      `${this.baseURL}/admin/company/update/${id}`,
      organization
    );
  }

  deleteOrganization(id: number): Observable<object> {
    return this.http.delete<object>(
      `${this.baseURL}/admin/company/delete/${id}`
    );
  }

  getAllOrganization(): Observable<Organization[]> {
    return this.http.get<Organization[]>(
      `${this.baseURL}/admin/companies/fetchall`
    );
  }

  getOrganizationById(id: number): Observable<Organization> {
    return this.http.get<Organization>(
      `${this.baseURL}/admin/company/fetchbyid/${id}`
    );
  }
}
