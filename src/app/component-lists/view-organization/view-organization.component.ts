import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from 'src/app/classes/organization';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-view-organization',
  templateUrl: './view-organization.component.html',
  styleUrls: ['./view-organization.component.css']
})
export class ViewOrganizationComponent implements OnInit{

  organization: Organization = new Organization();
  companyId: number;

  constructor(private router: Router, private auth: AuthserviceService, private route: ActivatedRoute) { }
  ngOnInit(): void {
     this.companyId = this.route.snapshot.params['companyId'];
     this.auth.getOrganizationById(this.companyId).subscribe(data => {
      this.organization = data;
  })

  }
}
