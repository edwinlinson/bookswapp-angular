import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSignDivVisiable: boolean  = true;
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  validationErrorMessage: string | null = null; 
  errorMessage: string | null = null;
  showOTPField: boolean = false;
  showResendOTP: boolean = false;
  timer: number = 60;

  loginObj: any = {
    email: '',
    password: ''
  };
  
  signUpObj:any = {
    username: '',
    name:'',
    email: '',
    password:''
  }
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService :AuthServiceService,
    private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',[Validators.required,Validators.pattern(/^[a-zA-Z._]+$/)]],
      password: ['', Validators.required]
    })
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/)]],
      username: ['',[Validators.required,Validators.pattern(/^[a-zA-Z._]+$/)]],
      name:['',[Validators.required,Validators.minLength(3)]],
      otp: ['']
    })
  }

  onLoginSubmit() {
    console.log('in loginSubmit');
    if (this.loginForm.valid) {
      console.log('Form submitted')
      const credentials = this.loginForm.value;
      console.log('credentials: ',credentials)
      this.authService.login(credentials).subscribe(
        response => {
          console.log('Login successful:', response);
          this.router.navigate(['/user']);
        },
        error => {
          console.error('Login error:', error);
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  onRegisterSubmit() {
    if (this.registerForm.valid) {
        const formData = this.registerForm.value;
        if (this.showOTPField) {
            const otpControl = this.registerForm.get('otp');
            if (otpControl) {
                formData['otp'] = otpControl.value;
                this.authService.register(formData).subscribe(
                    response => {
                        console.log('Registration successful:', response);
                        this.router.navigate(['/user']);
                    },
                    error => {
                        console.error('Registration error:', error);
                        this.errorMessage = 'An error occurred during registration: ' + error.message;
                    }
                );
            }
        } else {
            this.authService.generateOTP(formData).subscribe(
                response => {
                    console.log('OTP generated successfully:', response);
                    this.showOTPField = true;
                    this.startTimer();
                },
                error => {
                    console.error('Error generating OTP:', error);
                    this.errorMessage = 'An error occurred during OTP generation: ' + error.message;
                }
            );
        }
    } else {
        this.registerForm.markAllAsTouched();
    }
}


  


//   onRegisterSubmit() {
//     if (this.registerForm.valid) {
//         const formData = this.registerForm.value;
//         this.authService.generateOTP(formData).subscribe(
//             response => {
//                 console.log('OTP generated successfully:', response);
//                 this.showOTPField = true;
//                 this.startTimer();
//             },
//             error => {
//                 console.error('Error generating OTP:', error);
//                 this.errorMessage = 'An error occurred: ' + error.message;
//             }
//         );
//     } else {
//         this.registerForm.markAllAsTouched();
//     }
// }

startTimer() {
  this.timer = 30; 
  const interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
          this.showResendOTP = true;
          clearInterval(interval);
      }
  }, 1000);
}

resendOTP() {
  this.showResendOTP = false;
  const formData = this.registerForm.value;
  this.authService.generateOTP(formData).subscribe(
    response => {
        console.log('OTP generated successfully:', response);
        this.showOTPField = true;
        this.startTimer();
    },
    error => {
        console.error('Error generating OTP:', error);
        this.errorMessage = 'An error occurred during OTP generation: ' + error.message;
    }
);
}

  // onRegisterSubmit() {
  //   if (this.registerForm.valid) {
  //     const formData = this.registerForm.value;
  //     this.authService.register(formData).subscribe(
  //       response => {
  //         console.log('Registration successful:', response);
  //         this.router.navigate(['/user']);
  //       },
  //       error => {
  //         console.error('Registration error:', error);
  //         this.errorMessage = 'An error occurred: ' + error.message;
  //       }
  //     );
  //   } else {
  //     this.registerForm.markAllAsTouched();
  //   }
  // }


    //   const formData = this.loginForm.value;
    //   // Example: Make a POST request to your login endpoint
    //   this.http.post<any>('http://localhost:8080/auth/login', formData).subscribe(
    //     response => {
    //       // Handle successful response
    //       console.log('Login Response:', response);
    //       // Redirect to desired URL
    //       // this.router.navigate(['/dashboard']);
    //     },
    //     error => {
    //       // Handle error
    //       console.error('Login Error:', error);
    //     }
    //   );
    // } else {
    //   // Form is invalid, mark fields as touched to display validation errors
    //   this.loginForm.markAllAsTouched();
    // }
  // }
  
}
