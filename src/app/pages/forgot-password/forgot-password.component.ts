import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgorService } from 'src/app/services/forgotpassword/forgor.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private fogotService:ForgorService){}
  
  forgotPasswordForm! : FormGroup;
  showOTPField: boolean = false;
  user: any;
  timer: number = 0; 
  intervalId: any; 
  showResendOTP: boolean = false;


  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['']
    })
  }

  onForgotSubmit(){
    const email = this.forgotPasswordForm.value.email;
    this.fogotService.fetchUserDetails(email).subscribe(
      (response:any )=>{
        console.log('User details fetch succesfull ',response);
        this.showOTPField =true;
        this.user = response;
        console.log('User crrated from response: ',this.user)
        // this.fogotService.generateOTP(email)
        this.fogotService.generateOTP(email).subscribe(
          (otpResponse: any) => {
            console.log('OTP generated successfully', otpResponse);
          },
          (otpError: any) => {
            console.error('An error occurred while generating OTP', otpError);
          }
        );
        this.startTimer();
      },
      (error :any)=>{
        console.error('An error occured ',error);
      }
    )
  }
  startTimer() {
    this.timer = 60; 
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--; 
      } else {
        clearInterval(this.intervalId); 
      }
    }, 1000); 
  }

  resendOTP() {
    this.showResendOTP = false;
  }
}


