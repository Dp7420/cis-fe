import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { Services } from 'src/app/classes/services';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.css']
})
export class AddCustomersComponent implements OnInit {

  customerForm: FormGroup;
  selectedCategoryId: number | null = null;
  selectedServiceId: number | null = null;
  category: Category[] = [];
  service: Services[] = [];

  constructor(private fb: FormBuilder, private auth: AuthserviceService, private router: Router) { 
    this.customerForm = this.fb.group({
      primaryName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(3), Validators.maxLength(20)]],
      primaryEmail: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      primaryMobile: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/), Validators.minLength(10), Validators.maxLength(10)]],
      mainPerson: ['', [Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(3), Validators.maxLength(20)]],
      comTelephone: [''],
      address: [''],
      website: [''],
      secondaryName: ['', [Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(3), Validators.maxLength(20)]],
      secondaryEmail: ['', [Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      secondaryMobile: ['', [Validators.pattern(/^[6-9][0-9]{9}$/), Validators.minLength(10), Validators.maxLength(10)]],
      designation: ['', [Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(3), Validators.maxLength(20)]],
      pan: ['', [Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/), Validators.minLength(10), Validators.maxLength(10)]],
      state: ['', [Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(30)]],
      category: ['', Validators.required],
      companyName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(3), Validators.maxLength(30)]],
      cin: ['', [Validators.minLength(15), Validators.maxLength(30)]],
      companyEmail: ['', [Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      contactNo: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      gst: [''],
      pincode: ['', [Validators.pattern(/^[0-9]{6}$/), Validators.minLength(6), Validators.maxLength(6)]],
      service: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.auth.getAllCategorys().subscribe(response => {
      this.category = response;
      if (this.category.length > 0) {
        this.selectedCategoryId = this.category[0].categoryId; 
        this.fetchServices(); 
      }
    });
  }

  fetchServices(): void {
    if (this.selectedCategoryId !== null) {
      this.auth.getServiceByCategoryId(this.selectedCategoryId).subscribe(response => {
        if (Array.isArray(response)) {
          this.service = response;
        } else {
          this.service = response ? [response] : [];
        }
      });
    }
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategoryId = Number(target.value);
    this.fetchServices();
  }

  onServiceChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedServiceId = Number(target.value);
  }

  onSubmit(): void {
    // if (this.customerForm.invalid) {
    //   this.customerForm.markAllAsTouched(); // Mark all controls as touched to show validation errors
    //   return;
    // }

    const formData = this.customerForm.value;
    
    // First API call: Save customer data
    console.log(formData);
    this.auth.saveCustomer(formData).subscribe((response: any) => {
      const customerId = response.customerId;
      console.log(customerId);
      if (customerId) {
        alert("Customer Added Successfully");
        
        // Second API call: Add selected service to the customer
        const serviceIds = [this.selectedServiceId]; // Wrap serviceId in an array
        this.auth.addServicesToCustomer(customerId, serviceIds).subscribe(serviceResponse => {
          if (serviceResponse) {
            alert("Service Added Successfully");
            this.router.navigate(['/customer']);
          } else {
            alert('Error adding service');
          }
        }, error => {
          alert('Error adding service');
        });
      } else {
        this.router.navigate(['/customer']);
      }
    }, error => {
      alert('Error adding customer');
    });
  }

  goBack() {
    this.router.navigate(['/customer']);
  }
}
