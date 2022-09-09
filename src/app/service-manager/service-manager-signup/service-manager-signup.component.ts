import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth.service';

@Component({
  selector: 'app-service-manager-signup',
  templateUrl: './service-manager-signup.component.html',
  styleUrls: ['./service-manager-signup.component.css']
})
export class ServiceManagerSignupComponent implements OnInit {

  form!: FormGroup;
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
    
     this.service.ServiceSignup(this.form.value).subscribe();
    this.route.navigateByUrl('login')
   }
}


