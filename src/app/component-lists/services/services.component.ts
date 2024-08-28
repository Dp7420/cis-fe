import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Services } from 'src/app/classes/services';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{
  ngOnInit(): void {
    this.getServices();
    let data=localStorage.getItem('role');
    console.log('data'+data);
    // data = data.replace(/^"|"$/g,'');
    if(data==='"ADMIN"'){
      this.isAdmin=true;
    }else{
      this.isAdmin=false;
    }
  }
  isAdmin:boolean=false;
  searchresults:any;
  services: Services[] = [];
  
  constructor(private auth: AuthserviceService, private route: Router) {}
  getServices() {
    this.auth.getAllservice().subscribe(data =>{
      this.services=data;
    });
  }
  
  updateService(serviceId: number) {
    this.route.navigate(['update-service',serviceId]);
  }
  deleteService(serviceId: number){
    this.auth.deleteService(serviceId).subscribe(data =>{
      console.log(data);
      this.getServices();
      this.route.navigate(['/service']);
    })
  }
  getServiceById(serviceId: number) {
    this.route.navigate(['view-service',serviceId]);
  }
  }