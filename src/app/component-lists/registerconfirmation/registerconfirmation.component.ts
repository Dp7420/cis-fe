import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerconfirmation',
  templateUrl: './registerconfirmation.component.html',
  styleUrls: ['./registerconfirmation.component.css']
})
export class RegisterconfirmationComponent {

constructor(private router: Router) {}
  close() {
 this.router.navigate(['/login']);
}

}
