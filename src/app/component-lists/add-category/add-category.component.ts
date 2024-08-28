import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  cate:Category=new Category();
  regForm: FormGroup;

  constructor(private auth: AuthserviceService, private router: Router) {
    this.regForm = new FormGroup({
      categoryName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]),
      categoryShortName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z]+$/)
      ])
    });
  }


goBack() {
 this.router.navigate(['/category']);
}
onSubmit() {
  this.auth.addCategory(this.cate).subscribe(response=>{
    if(response!=null){
      alert("Category Added Successfully");
      this.router.navigate(['/category']);
    }else{
      alert('error');
    }
  })
}

}
