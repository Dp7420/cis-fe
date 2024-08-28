import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  categoryId: number;
  category: Category = new Category();

  constructor(private auth:AuthserviceService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['categoryId'];
    this.auth.getCategoryById(this.categoryId).subscribe(data=>{
      this.category = data;
    })
  }

}
