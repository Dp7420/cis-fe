import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/classes/user-details';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {
  users: UserDetails[] = []; // Updated to `users` for clarity
  isAdmin: boolean = false;
  user: UserDetails;

  constructor(private auth: AuthserviceService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
    const data = localStorage.getItem('role');
    console.log('data:', data);
    this.isAdmin = data === '"ADMIN"';
  }

  getUsers(): void {
    console.log('Fetching users');
    const role = localStorage.getItem('role');
    if (role) {
      const cleanedRole = role.replace(/^"|"$/g, '');
      console.log(cleanedRole);

      if (cleanedRole === 'ADMIN') {
        const role1 = 'USER';
        this.auth.retrieveByRoleAdmin(role1).subscribe((response: UserDetails[]) => {
          console.log(response);
          if (response != null) {
            this.users = response;
          }
        });
      }
    }
  }

  approveUser(id: number): void {
    this.auth.approveUser(id).subscribe((response: any) => {
      console.log('User approved:', response);
      const user = this.users.find(user => user.id === id);
      if (user) {
        user.status = 'Approved';
      }
      this.router.navigate(['/user-details']);
    },
    (error) => {
      console.error('Error approving user:', error);
    });
  }

  rejectUser(id: number): void {
    this.auth.rejectUser(id).subscribe((response: any) => {
      console.log('User rejected:', response);
      const user = this.users.find(user => user.id === id);
      if (user) {
        user.status = 'Rejected';
      }
      this.router.navigate(['/user-details']);
    },
    (error) => {
      console.error('Error rejecting user:', error);
    });
  }
}
