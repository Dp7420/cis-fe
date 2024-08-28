import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/classes/user-details';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-user-deatils',
  templateUrl: './user-deatils.component.html',
  styleUrls: ['./user-deatils.component.css']
})
export class UserDeatilsComponent implements OnInit {

  isAdmin:boolean=false;
  searchresults:any;

  retriveUserbyId(id: number) {
this.router.navigate(['view-users',id])
}
updateUsers(id: number) {
this.router.navigate(['update-users',id]);
}

  user: UserDetails[] = [];

  constructor(private router:Router,private auth:AuthserviceService) { }
  ngOnInit(): void {
    this.getUsers();
    let data=localStorage.getItem('role');
    console.log('data'+data);
    // data = data.replace(/^"|"$/g,'');
    if(data==='"ADMIN"'){
      this.isAdmin=true;
    }else{
      this.isAdmin=false;
    }
  }

  getUsers(){
    console.log('USERS');
    let role=localStorage.getItem('role');
    if(role){
      role = role.replace(/^"|"$/g,'');
      console.log(role);
      
      if(role=='ADMIN'){
        const role1='USER';
        this.auth.retrieveByRoleAdmin(role1).subscribe((response:any)=>{
          console.log(response);
          if(response!=null){
            console.log(response);
            
            this.user=response;
          }
        })
      }

    }
  }

  deleteUser(id: number) {
    this.auth.deleteUser(id).subscribe(data =>{
      console.log(data);
      this.getUsers();
      this.router.navigate(['/users']);
    })
  }

  approveUser(id:number): void{
    this.auth.approveUser(id).subscribe((response:any)=>{
      console.log('user approved', response);
      const user = this.user.find(user => user.id ===id);
      if(user){
        user.status='Approved';
      }
      this.router.navigate(['/user-details']);
    },
    (error) => {
      console.error('Error approving user:', error);
    });
  }

  rejectUser(id:number): void {
    this.auth.rejectUser(id).subscribe(
      (response: any) => {
        console.log('User rejected:', response);
        const user = this.user.find(user => user.id ===id);
      if(user){
        user.status='Rejected';
      }
        this.router.navigate(['/user-details']);
      },
      (error) => {
        console.error('Error rejecting user:', error);
      }
    );
  }
}