import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  
  emailForm: FormGroup;
  otpForm: FormGroup;
  newPasswordForm: FormGroup;
  step: number = 1;
  email:String='';
  otp:String='';
  verifyOtpForm: any;

  constructor(private fb: FormBuilder, private service: AuthserviceService, private router: Router) {
  
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });

    this.verifyOtpForm = this.fb.group({
      otp: ['', Validators.required]
    });

    this.newPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void { }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    if (newPassword?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  verifyEmail() {
    if (this.emailForm.valid) {
      this.service.emailValidation(this.emailForm.value.email).subscribe(response => {
        if (response.statusCode === 'OK' && response.statusCodeValue === 200) {
          this.email = this.emailForm.value.email;
          this.step = 2;
        } else {
          alert('Email not found. Please try again.');
        }
      });
    }
  }

  // sendOtp() {
  //   if (this.emailForm.valid) {
  //     this.service.sendPasswordResetOTP(this.email).subscribe(response => {
  //       if (response.statusCode === 'OK' && response.statusCodeValue === 200) {
  //         alert(response.body);
  //         this.step = 3;
  //       } else {
  //         alert('Failed to send OTP. Please try again.');
  //       }
  //     });
  //   }
  // }

  verifyOtp() {
    if (this.verifyOtpForm.valid) {
      this.service.VerifyOtp(this.email, this.verifyOtpForm.value.otp).subscribe(response => {
        if (response.statusCode === 'OK' && response.statusCodeValue === 200) {
          this.otp = this.verifyOtpForm.value.otp;
          this.step = 3;
        } else {
          alert('Invalid OTP. Please try again.');
        }
      });
    }
  }

  resetPassword() {
    if (this.newPasswordForm.valid) {
      this.service.changepassword(this.email, this.otp, this.newPasswordForm.value.newPassword).subscribe(response => {
        if (response.statusCode === 'OK' && response.statusCodeValue === 200) {
          alert('Password reset successful.');
          this.step = 4;
        } else {
          alert('Failed to reset password. Please try again.');
        }
      });
    }
  }
}
