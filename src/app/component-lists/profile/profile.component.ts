import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDetails } from 'src/app/classes/user-details';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails: UserDetails = new UserDetails();
  memberId: number;
  isAdmin: boolean = false;
  isUser: boolean = false;

  constructor(private router: Router, private auth: AuthserviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.memberId = this.route.snapshot.params['id'];
    // this.auth.retriveUserbyId(this.memberId).subscribe(data => {
    //   this.userDetails = data;
    //   console.log(data);
    // })

    let data = localStorage.getItem('role');
    if(data === '"ADMIN"'){
      this.isAdmin = true;
      this.auth.retriveAdminbyId(this.memberId).subscribe(data => {
        this.userDetails = data;
      })
  } else if (data === '"USER"'){
    this.isUser = true;
    this.auth.retriveUserbyId(this.memberId).subscribe(data => {
      this.userDetails = data;
    });
  }
}
}
