import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth.service';
import { ResetPasswordDto } from '../model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  user = new ResetPasswordDto();
   token !: string;
   email !: string;

  constructor(private service : AuthService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'];
    console.log(this.email)
     this.token = this.route.snapshot.queryParams['token'];
    console.log(this.token)
  }
   
  onSubmit(user : ResetPasswordDto)
  {
    this.user.email = this.email;
    this.user.token = this.token;
    console.log(this.user.email);
      console.log(this.user.token);
    return this.service.resetPassword(user).subscribe(data =>{
      console.log(data)
        this.router.navigateByUrl('login');
    },(error) => {
            console.log(error.error);
        });
   
  }

 
  
}
