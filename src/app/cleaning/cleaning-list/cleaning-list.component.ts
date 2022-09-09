import { Component, OnInit } from '@angular/core';
import { Student,Cleaning,CleaningType } from 'src/app/entities';
import { StudentServiceService } from 'src/app/student/student-service.service';
import {faYoutube} from '@fortawesome/free-brands-svg-icons'
import {faPenToSquare,faTrashCan,faFilePdf,faUser} from '@fortawesome/free-regular-svg-icons'
import {faFileCsv} from '@fortawesome/free-solid-svg-icons'
import { AuthService } from 'src/app/auth-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cleaning-list',
  templateUrl: './cleaning-list.component.html',
  styleUrls: ['./cleaning-list.component.css']
})
export class CleaningListComponent implements OnInit {

  constructor(private service : StudentServiceService,private authService : AuthService, private router : Router) { }

  cleaningList !: Cleaning[];

  student: Student[] = [];
  student$:Student[] =[];
  cleaningType : CleaningType[]=[];
  cleaningType$ : CleaningType[]=[];

  //icons
   faYoutube = faYoutube;
  faPenToSquare = faPenToSquare;
  faTrash = faTrashCan;
  faCsv = faFileCsv;
  faPdf = faFilePdf;
  faUser = faUser;


  //mapping
  studentMap : Map<string,string> = new Map();
  cleaningMap : Map<number,string> = new Map();

  ngOnInit(): void {
    this.service.getAllCleaning().subscribe((data : Cleaning[])=>{
      this.cleaningList = data;
      console.log(data);
    });
    this.service.getAllStudent().subscribe((data:Student[])=>{
      this.student$ = data;
      console.log(data);
    })

    this.service.getAllCleaningTypes().subscribe((data : CleaningType[])=>{
      this.cleaningType$ = data;
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
    this.service.getAllCleaningTypes().subscribe((data : CleaningType[])=>{
      this.cleaningType = data;
       for(let i = 0; i < data.length; i++){
    this.cleaningMap.set(this.cleaningType[i].cleaningTypeId,this.cleaningType[i].name)
       }
    });
  }

     deleteCleaning(id:number){
  this.service.deleteCleaning(id).subscribe(res=>{
   // this.student = this.student.filter(item=>item.courseId !== id);
    console.log('Student is deleted');
      this.router.navigateByUrl('Cleaning/list');
  })
}

   exportPDF(){ 
   this.authService.exportCleaningPdf().subscribe(response =>{
   let fileName = response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
    let blob : Blob=response.body as Blob;
    let a = document.createElement('a');
    a.download ='RAS_CleaningList';
    a.href = window.URL.createObjectURL(blob);
    a.click();
  });
}

 exportExcel(){
  this.authService.exportCleaningExcel().subscribe(response =>{
    let fileName = response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
    let blob : Blob=response.body as Blob;
    let a = document.createElement('a');
    a.download = 'RAS_CleaningList.xlsx'
    a.href = window.URL.createObjectURL(blob);
    a.click();
  });
}


}
