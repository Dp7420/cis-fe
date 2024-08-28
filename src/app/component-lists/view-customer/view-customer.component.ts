import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { Customers } from 'src/app/classes/customers';
import { Services } from 'src/app/classes/services';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit{




  customer: Customers = new Customers();
  customerId:number;
  category: Category[] =[];
  service:any[]=[];

  constructor(private auth : AuthserviceService, private route: ActivatedRoute) {}
  ngOnInit(): void {
      this.customerId = this.route.snapshot.params['customerId'];
      this.auth.getCustomersById(this.customerId).subscribe((data:Customers)=>{
        this.customer = data;
  })
}
}
