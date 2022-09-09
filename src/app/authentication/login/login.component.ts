import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-services/auth.service';
import { JwtToken, LoginResult, Student } from 'src/app/entities';
import { Login } from '../model';
import  jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { StudentServiceService } from 'src/app/student/student-service.service';
import { filter, map } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new Login();
 result !: LoginResult;
 model : Student[] =[]
 message!: string;
 data :[]=[]
 currentTok !: string;
 currentStudent =new Student();
 id :any;
 
 jwtTok = new JwtToken();
  
  constructor(private service : AuthService,private studService : StudentServiceService, private  router : Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(user : Login)
  {
    
      this.service.login(user).subscribe((token : string) =>{
     localStorage.setItem('authToken', token);
     
       this.jwtTok = jwt_decode(token);

        console.log(token);
        console.log(this.jwtTok.exp);
        console.log(this.jwtTok.User);
         this.id = this.jwtTok.Identfier;

         const model =this.studService.getAllStudent().pipe(map(x=>x.filter( entity => entity.id == this.jwtTok.Identfier)))
        .subscribe((data :any)=>{
          this.currentStudent = data[0];
          
            if(this.jwtTok.User == "User")
       {      
       
         if( this.currentStudent.roomId== 0)
         {
          this.router.navigateByUrl('Student/complete/'+this.id);
         }   
         else{
          this.router.navigateByUrl('Student/dashboard/'+this.id);
         }
        }

    });

      console.log(model)
      
      

        if (this.jwtTok.User == "Admin")
       {
        this.router.navigateByUrl('Manager/dashboard/'+this.id)
       }
       else{
        this.router.navigateByUrl('ServiceEmp/dashboard/'+this.id)
       }        
       })
    
     
  }


}  

