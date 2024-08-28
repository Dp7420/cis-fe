import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { Services } from 'src/app/classes/services';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit {

  services: Services = new Services();
  category: Category[] = [];
  selectedCategoryId: number | null = null;
  regForm: FormGroup;

  constructor(
    private router: Router,
    private auth: AuthserviceService
  ) {
    this.regForm = new FormGroup({
      // categoryId: new FormControl('', [Validators.required]),

      serviceName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]),
      serviceShortName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z]+$/)
      ])
    });
   }

  ngOnInit(): void {
    this.auth.getAllCategorys().subscribe(response => {
      this.category = response;
    });
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategoryId = Number(target.value);
    this.services.category.categoryId=+this.selectedCategoryId;
  }

  saveService() {
    console.log(this.services);
    this.auth.addService(this.services).subscribe(
      (data) => {
        console.log(data);
        this.gotoServiceList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  gotoServiceList() {
    this.router.navigate(['/service']);
  }

  onSubmit() {
    this.saveService();
  }
}
