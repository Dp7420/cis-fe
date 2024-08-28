import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customers } from 'src/app/classes/customers';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  ngOnInit(): void {
    this.getCustomers();
    let data=localStorage.getItem('role');
    // console.log('data'+data);
    // data = data.replace(/^"|"$/g,'');
    if(data==='"ADMIN"'){
      this.isAdmin=true;
    }else{
      this.isAdmin=false;
    }
  }
  isAdmin:boolean=false;
  searchresults:any;
  customers: Customers[] = [];
  
  constructor(private auth: AuthserviceService, private route: Router) {}
  getCustomers() {
    this.auth.getAllCustomers().subscribe(data => {
      this.customers = data;
      console.log(data);
      
    });
  }
  
  upadateCustomerDetails(customerId: number) {
    this.route.navigate(['update-customer',customerId]);
  }
  deleteCustomers(id: number){
    this.auth.deleteCustomers(id).subscribe(data =>{
      console.log(data);
      this.getCustomers();
      this.route.navigate(['/customer']);
    })
  }
  getCustomersById(customerId: number) {
    this.route.navigate(['view-customer',customerId]);
  }
  }
  