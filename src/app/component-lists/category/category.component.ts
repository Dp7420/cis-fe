import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
ngOnInit(): void {
  this.getCategories();
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
categories: Category[] = [];

constructor(private auth: AuthserviceService, private route: Router, public dialog: MatDialog) {}
getCategories() {
  this.auth.getAllCategorys().subscribe(data =>{
    this.categories=data;
  })
}

updateCategory(categoryId: number) {
  this.route.navigate(['update-category',categoryId]);
}
deleteCategory(categoryId: number){
  this.auth.deleteCategory(categoryId).subscribe(data =>{
    console.log(data);
    this.getCategories();
    this.route.navigate(['/category']);
  })
}

// deleteCategory(categoryId: number): void {
//   const dialogRef = this.dialog.open(DeletedataComponent);

//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {
//       this.auth.deleteCategory(categoryId).subscribe(
//         data => {
//           console.log(data);
//           this.getCategories();
//           this.route.navigate(['/category']);
//         },
//         error => console.log(error)
//       );
//       console.log(`Category with ID ${categoryId} deleted.`);
//     }
//   });
// }
getCategoryById(categoryId: number) {
  this.route.navigate(['view-category',categoryId]);
}
}
