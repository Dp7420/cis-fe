import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Organization } from 'src/app/classes/organization';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit{
  ngOnInit(): void {
    this.getOrganization();
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
  organization: Organization[] = [];
  
  constructor(private auth: AuthserviceService, private route: Router) {}
  getOrganization() {
    this.auth.getAllOrganization().subscribe(data => {
      this.organization = data;
    });
  }
  
  upadateOrganization(companyId: number) {
    this.route.navigate(['update-org',companyId]);
  }
  deleteOrganization(companyId: number){
    this.auth.deleteOrganization(companyId).subscribe(data =>{
      console.log(data);
      this.getOrganization();
      this.route.navigate(['/org']);
    })
  }
  getOrganizationById(companyId: number) {
    this.route.navigate(['view-org',companyId]);
  }
  }