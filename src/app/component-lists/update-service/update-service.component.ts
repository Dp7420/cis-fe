import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { Services } from 'src/app/classes/services';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit{


  serviceId:number;
  services: Services = new Services();
  category: Category [] = [];
  selectedCategoryId: number | null = null;

  constructor(private route:ActivatedRoute,private auth:AuthserviceService,private router:Router){}

  ngOnInit(): void {
    this.auth.getAllCategorys().subscribe(response=>{
      this.category = response;
    });
    this.serviceId=this.route.snapshot.params['serviceId'];
    this.auth.getServiceById(this.serviceId).subscribe(response=>{
      if(response!=null){
        this.services=response;
      }else{
        alert('error');
      }
    })
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategoryId = Number(target.value);
    this.services.category.categoryId=+this.selectedCategoryId;
  }
onSubmit() {
  console.log(this.services);
  this.auth.updateService(this.serviceId, this.services).subscribe(response=>{
    if(response!=null){
      console.log(response+"hello");
      alert('Service details updated successfully.');
      this.router.navigate(['/service']);
    }else{
      alert('error'+response);
    }
  })
}
  // gotoServiceList() {
  //   this.router.navigate(['/service-list']);
  // }
}
