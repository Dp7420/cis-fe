import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from 'src/app/classes/services';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-view-servicece',
  templateUrl: './view-servicece.component.html',
  styleUrls: ['./view-servicece.component.css']
})
export class ViewServiceceComponent implements OnInit{

  services: Services = new Services();
  serviceId:number;

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthserviceService) {}

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.params['serviceId'];
    console.log(this.serviceId);
    this.auth.getServiceById(this.serviceId).subscribe(data => {
     this.services = data;
 })
 }
}
