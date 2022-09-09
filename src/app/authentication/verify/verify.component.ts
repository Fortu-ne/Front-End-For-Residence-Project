import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/auth-services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  public token : string = "";

  constructor(private service : AuthService, private router : Router, private route : ActivatedRoute) { }


  ngOnInit(): void {
  this.route.queryParams.subscribe((queryParam)=>{
    this.token = queryParam['token'];
  })
  this.verification(this.token);
  }

  verification(token : string){
    this.service.verfication(token).subscribe((data=>{
      console.log(data);
      this.router.navigateByUrl('login');
    }))
  }

   
}
