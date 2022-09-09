import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, Gender, Room, Student } from 'src/app/entities';
import { StudentServiceService } from '../student-service.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  id!: string;
  student!: Student;
   room!: Room;
   gender!: Gender;
   course!: Course;
  constructor(private service: StudentServiceService, private route :ActivatedRoute
    ,private router: Router ) { }

 ngOnInit(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.service.findStudent(this.id).subscribe((data : Student) =>{
      this.student = data;
      this.student.courseId = data.courseId;
      this.student.genderId = data.genderId;
      this.student.roomId = data.roomId; 
        console.log(this.student);   
        this.service.getCourse(data.courseId).subscribe((data : Course)=>{
         this.course = data;
         console.log(data);  
    });
     this.service.findRoom(this.student.roomId).subscribe((data : Room)=>{
       this.room = data;
          console.log(data);
     });
    this.service.getGender(this.student.genderId).subscribe((data : Gender)=>{
       this.gender = data;
       console.log(data);
     });
      
    });
    
  }
   
  deleteStudent(): void {
    this.service.deleteStudent(this.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/students']);
        },
        error: (e) => console.error(e)
      });
    }

  onBack(): void{
    this.router.navigate(['/students']);
  }
}
