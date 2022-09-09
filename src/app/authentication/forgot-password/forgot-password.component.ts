import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail !: string;
  constructor(private service: AuthService) { }

  ngOnInit(): void {
  }

  forgotPassword(userEmail : string)
  {
    console.log(userEmail)
    this.service.forgotPassword(userEmail).subscribe(data =>{
        console.log(data)
    },(error) => {
            console.log(error.error);
        });
    }


  

}
