import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user:Users=new Users();
  error: string = '';

  regForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(private auth: AuthserviceService, private router: Router) {}

  onSubmit() {
    if (this.regForm.valid) {
      const user = this.regForm.value;
      
      this.auth.login(this.user).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response && response.body && response.body.email === user.email) {
            localStorage.clear();
            localStorage.setItem('id', JSON.stringify(response.body.id));
            localStorage.setItem('token', JSON.stringify(response.body.token));
            localStorage.setItem('role', JSON.stringify(response.body.role));
            this.router.navigate(['home']);
          } else {
            alert('Username or Password is incorrect');
            this.error = 'Username or Password is not correct';
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Login failed', error);
          alert('Invalid credentials or insufficient permissions.')
          this.error = 'Invalid credentials or insufficient permissions.';
        }
      });
    }
  }
}

export class Users{
  email:String='';
  password:String='';
}