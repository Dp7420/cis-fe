import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from 'src/app/classes/organization';
import { UserDetails } from 'src/app/classes/user-details';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
onBackClick() {
  this.router.navigate(['/user-details']);
}

  userDetails: UserDetails;
  memberId: number;
  // companyName: Organization;


  constructor(private router: Router, private auth : AuthserviceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.memberId = this.route.snapshot.params['id'];

    this.auth.retriveUserbyId(this.memberId).subscribe(data =>{
      this.userDetails = data;
    })
  }
}
