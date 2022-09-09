import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth.service';
import { ServiceManager } from 'src/app/entities';

@Component({
  selector: 'app-service-manager-view',
  templateUrl: './service-manager-view.component.html',
  styleUrls: ['./service-manager-view.component.css']
})
export class ServiceManagerViewComponent implements OnInit {

  id!: string
  manager = new ServiceManager();
  constructor(private router :Router,private route :ActivatedRoute,private managerService : AuthService) { }

  ngOnInit(): void {
     this.id = String(this.route.snapshot.paramMap.get('id'));
     this.managerService.getServiceManager(this.id).subscribe((data : any)=>{
       this.manager = data;
     });
    }

}
