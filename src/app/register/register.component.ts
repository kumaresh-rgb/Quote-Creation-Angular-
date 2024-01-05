import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formdata = {name:"", lastname:"",username:"",email:"",password:"",phoneno:"",role:""};
  formdata1={dob:""};
  submit=false;
  errorMessage="";
  loading=false;
  dob: Date | undefined;
  isDateSelected: boolean = false; // This variable will track whether the date is selected

  // Other relevant code

  // Function to toggle visibility based on date selection
  onDateSelected() {
    if (this.dob) {
      this.isDateSelected = true;
    } else {
      this.isDateSelected = false;
    }
  }

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit(){

      this.loading=true;

      //call register service
      this.auth
      .register(this.formdata.name,this.formdata.email,this.formdata.password)
      .subscribe({
          next:data=>{
              //store token from response data
              this.auth.storeToken(data.idToken);
              console.log('Registered idtoken is '+data.idToken);
              this.auth.canAuthenticate();

          },
          error:data=>{
              if (data.error.error.message=="INVALID_EMAIL") {

                  this.errorMessage = "Invalid Email!";

              } else if (data.error.error.message=="EMAIL_EXISTS") {

                  this.errorMessage = "Already Email Exists!";

              }else{

                  this.errorMessage = "Unknown error occured when creating this account!";
              }
          }
      }).add(()=>{
          this.loading =false;
          console.log('Register process completed!');
      })
  }

}
