import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Organization } from 'src/app/classes/organization';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent {

  organization: Organization=new Organization();
  regForm: FormGroup;

  constructor(private auth: AuthserviceService, private router: Router) {
    this.regForm = new FormGroup({
      companyname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[A-Za-z\s]+$/),
      ]),
      companyCode: new FormControl('',[
        Validators.required,
      ]),
      cin: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z0-9\s]+$/)
      ]),
      registerNo: new FormControl('', [
        Validators.required,
      ]),
      contactNo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[6-9][0-9]{9}$/),
        Validators.minLength(10),

      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z0-9\s]+$/)
      ]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]+$/)
      ]),
      dateOfIncorporation: new FormControl('', [
        Validators.required,
      ]),
      companyEmail: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/)
      ]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
        Validators.pattern(/^[0-9]+$/)
      ]),
      state: new FormControl('', [
        Validators.required,
      ]),
      website: new FormControl('', [
        Validators.required,
      ])
    });
   }

  onSubmit() {
    console.log(this.organization);
    this.auth.saveOrganization(this.organization).subscribe(response=>{
      console.log(response);
      if(response!= null){
        alert("Organization Added Successfully");
        this.router.navigate(['/org']);
      }else{
        alert("Failed to Add Organization");
      }
    })
  }
}
