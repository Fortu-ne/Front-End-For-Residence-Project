import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Maintenance, StatusType } from 'src/app/entities';
import { StudentServiceService } from 'src/app/student/student-service.service';

@Component({
  selector: 'app-maintenance-edit',
  templateUrl: './maintenance-edit.component.html',
  styleUrls: ['./maintenance-edit.component.css']
})
export class MaintenanceEditComponent implements OnInit {

  studId : string ="";
  id : number =0;
  maintenance = new Maintenance();
  type : StatusType[] = [];

  constructor(private service : StudentServiceService,private router : Router,private route:ActivatedRoute ) { }

  ngOnInit(): void {
  //  this.route.parent?.params.subscribe((data : any)=>{
  //     this.studId = data.id
  //     console.log(data.id); 
      
      
  //   })

     this.id = this.route.snapshot.params['id'];
    this.service.getMaintenance(this.id).subscribe((data : Maintenance)=>{
      this.maintenance = data;
     
    })
    this.getAllTypes();
   
}

 getAllTypes(){
  this.service.getAllStatutsType().subscribe((data : StatusType[])=>{
    this.type = data
  })
 }



  submit(data : Maintenance){
    console.log(this.maintenance);
    this.service.updateMaintenance(this.id, this.maintenance).subscribe((res:any) => {
         console.log('Post updated successfully!');
          
    })
    this.router.navigateByUrl('Maintenance/list');
  }

}
