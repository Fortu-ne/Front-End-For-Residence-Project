import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-services/auth.service';
import { Maintenance, MaintenanceType, StatusType, Student } from 'src/app/entities';
import { StudentServiceService } from 'src/app/student/student-service.service';
import {faYoutube} from '@fortawesome/free-brands-svg-icons'
import {faPenToSquare,faTrashCan,faFilePdf,faUser} from '@fortawesome/free-regular-svg-icons'
import {faFileCsv} from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {


  maintenaceList !: Maintenance[];

  student: Student[] = [];
  student$:Student[] =[];
  maintenanceType : MaintenanceType[]=[];
  maintenanceType$ : MaintenanceType[]=[];
  statusList : StatusType[]=[];
  statusList$ : StatusType[]=[];

  //Icons
    // Icons
  faYoutube = faYoutube;
  faPenToSquare = faPenToSquare;
  faTrash = faTrashCan;
  faCsv = faFileCsv;
  faPdf = faFilePdf;
  faUser = faUser;

  //mapping
  studentMap : Map<string,string> = new Map();
  maintenanceTypeMap : Map<number,string> = new Map();
  statusMap : Map<number,string> = new Map();

  constructor(private service : StudentServiceService, private authService : AuthService,private router : Router) { }

  ngOnInit(): void {
    this.service.getALllMaintenance().subscribe((data : Maintenance[])=>{
      this.maintenaceList = data;
      console.log(data);
    });
    this.service.getAllStudent().subscribe((data:Student[])=>{
      this.student$ = data;
      console.log(data);
    })
    this.service.getAllMaintenanceType().subscribe((data : MaintenanceType[])=>{
      this.maintenanceType$ = data;
      console.log(data);
    });
    this.service.getAllStatutsType().subscribe((data : StatusType[])=>{
      this.statusList$ = data;
      console.log(data);
    });
     this.refreshTypesMap();
  }

  refreshTypesMap(){
   this.service.getAllStudent().subscribe((data:Student[])=>{
      this.student = data;
      for(let i = 0; i < data.length; i++)
      {
        this.studentMap.set(this.student[i].id, this.student[i].name);
      }});
    this.service.getAllMaintenanceType().subscribe((data : MaintenanceType[])=>{
      this.maintenanceType = data;
      for(let i = 0; i < data.length; i++)
      {
this.maintenanceTypeMap.set(this.maintenanceType[i].maintenanceTypeId, this.maintenanceType[i].name);
      }
    });
    this.service.getAllStatutsType().subscribe((data : StatusType[])=>{
      this.statusList = data;
       for(let i = 0; i < data.length; i++){
    this.statusMap.set(this.statusList[i].statusId,this.statusList[i].name)
       }
    });

  }

    deleteMaintenance(id:number){
  this.service.deleteMaintenance(id).subscribe(res=>{
   // this.student = this.student.filter(item=>item.courseId !== id);
    console.log('Student is deleted');
      this.router.navigateByUrl('Maintenance/list');
  })
}

  exportPDF(){
  
   this.authService.exportMaintenancePdf().subscribe(response =>{
   let fileName = response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
    let blob : Blob=response.body as Blob;
    let a = document.createElement('a');
    a.download ='RAS_MaintenanceList';
    a.href = window.URL.createObjectURL(blob);
    a.click();
  })
}

 exportExcel(){
  this.authService.exportMaintenanceExcel().subscribe(response =>{
    let fileName = response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
    let blob : Blob=response.body as Blob;
    let a = document.createElement('a');
    a.download = 'RAS_MaintenanceList.xlsx'
    a.href = window.URL.createObjectURL(blob);
    a.click();
  })
}
}
