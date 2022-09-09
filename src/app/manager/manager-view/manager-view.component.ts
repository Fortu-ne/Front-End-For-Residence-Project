import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth.service';
import { Manager } from 'src/app/entities';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  
 id!: string
  manager = new Manager();
  constructor(private router :Router,private route :ActivatedRoute,private managerService : AuthService) { }

  ngOnInit(): void {
     this.id = String(this.route.snapshot.paramMap.get('id'));
     this.managerService.getManager(this.id).subscribe((data : any)=>{
       this.manager = data;
     });
}

}
