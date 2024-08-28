

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Organization } from 'src/app/classes/organization';
import { Services } from 'src/app/classes/services';
import { UserDetails } from 'src/app/classes/user-details';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  user:UserDetails=new UserDetails();
  org:Organization[]=[];
  organization:Organization=new Organization();
  selectedCategoryId: any;
  service1:Services=new Services();

  regForm: FormGroup;
  constructor(private router: Router, private service: AuthserviceService) { 
    this.regForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]+$/)  
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      companyName: new FormControl('', [
        Validators.required,
      ]),
      contactNo: new FormControl('', [
        // Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/), 
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      address: new FormControl('', [
        // Validators.required,
        Validators.minLength(6)
      ]),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/), 
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
      ,
      cin: new FormControl('', [
        Validators.required,
        // Validators.pattern(/^[6-9]\d{9}$/), 
        // Validators.minLength(10),
        // Validators.maxLength(10)
      ]),
      designation: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]),
    });
  }


  ngOnInit(): void {
    this.service.getAllOrganizationDetails().subscribe(response=>{
      if (Array.isArray(response)) {
        console.log(response);
        this.org = response;
      } else {
        this.org = response ? [response] : [];
      }
    })  
    // this.user.companyCode=this.organization.companyCode;
    this.user.cin=this.organization.cin;
    // this.user.dateOfIncorporation=this.organization.dateOfIncorporation;
    // this.user.registerNo=this.organization.registerNo;    
  }

  
  onCompanyIdChange($event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCategoryId = Number(target.value);
    this.user.company.companyId=this.selectedCategoryId;
    this.getOrganizationById(this.selectedCategoryId);
  }

  getOrganizationById(companyId:number){
    this.service.getOrganizationBy(companyId).subscribe(response=>{
      this.organization=response;
      console.log(response);
      this.user.cin=this.organization.cin;
      console.log('user cin :'+this.user.cin);
      
    })
  }
goBack() {
  this.router.navigate(['/login'])
}
onSubmit() {
  // console.log(this.user);
  this.service.register(this.user).subscribe((response:any)=>{
  if(response!=null){
    if(response.statusCode=='OK' && response.statusCodeValue=='200'){
      alert('register success fully wait for conformation...!');
      this.router.navigate(['/registerconfirm']);
    }else{
      alert('registration failed ... please enter valid Details...!'+response);
    }
  }else{
    alert('internal server error...!'+response);
  }
})
}
}