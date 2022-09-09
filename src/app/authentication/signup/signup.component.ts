import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth.service';
import { Login, SignUp } from '../model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = new SignUp();
  form !: FormGroup;
  constructor(private service : AuthService, private route : Router) { }

  ngOnInit(): void {
    this.form= new FormGroup({
     email: new FormControl('', [Validators.required,Validators.email]),
     name : new FormControl('',Validators.required),
     lastName : new FormControl('',Validators.required),
     phoneNumber : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(11)]),
     username : new FormControl('',[Validators.maxLength(7), Validators.required]),
     password : new FormControl('',[Validators.required, Validators.maxLength(9)]),
     confirmPassword: new FormControl('',[Validators.required, Validators.maxLength(9)])
    })
    
  }

   onSubmit(form : FormGroup)
   {
    
     this.service.register(this.form.value).subscribe();
    this.route.navigateByUrl('login')
   }
  
  //  register(user : SignUp){
  //   this.service.register(user).subscribe();
  //   this.route.navigateByUrl('login')
  // }


}


