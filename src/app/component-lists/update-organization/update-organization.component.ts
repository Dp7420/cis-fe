import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from 'src/app/classes/organization';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-update-organization',
  templateUrl: './update-organization.component.html',
  styleUrls: ['./update-organization.component.css']
})
export class UpdateOrganizationComponent implements OnInit{

  organization: Organization = new Organization();
  companyId: number;
  constructor(private router: Router, private auth: AuthserviceService, private route: ActivatedRoute) { }
  ngOnInit(): void {
      this.companyId = this.route.snapshot.params['companyId'];
      this.auth.getOrganizationById(this.companyId).subscribe(data => {
        this.organization = data;
  }, error => console.log(error)
   );
}

  onSubmit() {
    this.auth.upadateOrganization(this.companyId, this.organization).subscribe(data =>{
      this.router.navigate(['/org']);
    }, error => console.log(error)
    );
  }
}
