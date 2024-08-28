import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit{

  category: Category = new Category();
  categoryId: number;

  constructor(private router: Router, private auth: AuthserviceService, private route: ActivatedRoute) { }
  // goBack() {
  //  this.router.navigate(['/category']);
  // }

  ngOnInit(): void {
      this.categoryId = this.route.snapshot.params['categoryId'];
      this.auth.getCategoryById(this.categoryId).subscribe(data =>{
        this.category = data;
      }, error => console.log(error)
       );
  }

  onSubmit() {
  this.auth.updateCategory(this.categoryId, this.category).subscribe(data =>{
    console.log(data);
    this.router.navigate(['/category']);
  }, error => console.log(error)
   );
  }
}
