import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customers } from 'src/app/classes/customers';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit{

  customerId:number;
  customer:Customers=new Customers();
  constructor(private auth:AuthserviceService,private route:ActivatedRoute,private router:Router){}

ngOnInit(): void {
  this.customerId=+this.route.snapshot.params['customerId'];
    this.auth.getCustomersById(this.customerId).subscribe(response=>{
      if(response!=null){
        this.customer=response;
      }else{
        alert('error');
      }
    })
}
onSubmit() {
  this.auth.upadateCustomerDetails(this.customerId,this.customer).subscribe(response=>{
    if(response!=null){
      alert('customer Details Updated successfully..');
      this.router.navigate(['/customer']);
    }
  })
}


}
