import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-services/auth.service';
import { Course, Gender, Room, Student } from 'src/app/entities';
import { StudentServiceService } from '../student-service.service';
import {faYoutube} from '@fortawesome/free-brands-svg-icons'
import {faPenToSquare,faTrashCan,faFilePdf,faUser} from '@fortawesome/free-regular-svg-icons'
import {faFileCsv,faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  student: Student[] = [];
  roomList: Room[] = [];
  roomList$  : Room[] = [];
  courseList$ :Course[] = [];
  courseList :Course[]=[];
  genderList$ : Gender[]=[];
  genderList : Gender[]=[];

  // Icons
  faYoutube = faYoutube;
  faPenToSquare = faPenToSquare;
  faTrash = faTrashCan;
  faCsv = faFileCsv;
  faPdf = faFilePdf;
  faArrowLeft = faArrowLeft;
  faUser = faUser;
  //mapping
  roomTypesMap : Map<number,string> = new Map();
  courseListMap : Map<number,string> = new Map();
  genderListMap : Map<number,string> = new Map();

  constructor(private service : StudentServiceService, private authService : AuthService, private router :Router) { }

  ngOnInit(): void {
    this.service.getAllStudent().subscribe((data: Student[])=>{
      this.student = data;
      console.log(this.student);
    });
    this.service.getAllRooms().subscribe((data :Room[])=>{
      this.roomList$ = data;
      console.log(data);
    });
    this.service.getAllCourses().subscribe((data :Course[])=>{
   this.courseList$ = data;
   console.log(data);
    });
    this.service.getAllGender().subscribe((data : Gender[])=>{
      this.genderList$ = data;
      console.log(data);
    })
    this.refreshGenderTypesMap();
  }

  refreshGenderTypesMap(){
    this.service.getAllRooms().subscribe((data =>{
      this.roomList = data;
      for(let i = 0; i < data.length; i++)
      {
this.roomTypesMap.set(this.roomList[i].roomId, this.roomList[i].roomNum);
      }
    }));
    this.service.getAllCourses().subscribe((data =>{
      this.courseList = data;
      for(let i = 0; i < data.length; i++)
      {
        this.courseListMap.set(this.courseList[i].courseTypeId, this.courseList[i].courseName);
      }
    }));
    this.service.getAllGender().subscribe((data =>{
      this.genderList = data;
      for(let i =0; i < data.length; i++)
      {
        this.genderListMap.set(this.genderList[i].genderId, this.genderList[i].genderType);
      }
    }));
  }

  
  getStudentPdf(){
    this.authService.exportStudentPdf();
  }

  deleteStudent(id:string){
  this.service.deleteStudent(id).subscribe(res=>{
   // this.student = this.student.filter(item=>item.courseId !== id);
    console.log('Student is deleted');
  })
  this.router.navigateByUrl('Student/list');
}

  exportPDF(){
  
   this.authService.exportStudentPdf().subscribe(response =>{
   let fileName = response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
    let blob : Blob=response.body as Blob;
    let a = document.createElement('a');
    a.download ='StudentDetails_Pdf';
    a.href = window.URL.createObjectURL(blob);
    a.click();
  })
}

 studentExcel(){
  this.authService.exportStudentExcel().subscribe(response =>{
    let fileName = response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
    let blob : Blob=response.body as Blob;
    let a = document.createElement('a');
    a.download = 'Student List.xlsx'
    a.href = window.URL.createObjectURL(blob);
    a.click();
  })
 }

  
}
