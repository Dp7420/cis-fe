import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/classes/user-details';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
constructor(private router: Router) { }

isAdmin:boolean=false;
isUser:boolean=false;
user1: UserDetails;
id: number;
ngOnInit(): void {
    let data = localStorage.getItem('role');
    if(data==='"ADMIN"'){
      this.isAdmin=true;
    }else if(data==='"USER"'){
      this.isUser=true;
    }
    else{
      this.isAdmin=false;
      this.isUser=false;
    }
    this.id=JSON.parse(localStorage.getItem('id'));
}

profileIdSending(){
  this.router.navigate(['/profile',this.id]);
}

// retriveUserbyId(){
//   const id=JSON.parse(localStorage.getItem('id'));
//   this.router.navigate(['/profile',id]);
// }

signout() {
  this.router.navigate(['/login']);
  localStorage.clear();
}
}
