import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, Gender, Student } from 'src/app/entities';
import { StudentServiceService } from '../student-service.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  student!: Student;
  course!: Course;
  gender !: Gender;


  constructor(public service : StudentServiceService,
    private route : ActivatedRoute,
    private router : Router,
   private formBuilder : FormBuilder) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];  
    this.service.findStudent(this.id).subscribe((data: Student)=>{
      this.student = data;
      console.log(data);
         this.service.getCourse(this.student.courseId).subscribe((data : Course)=>{
    this.course = data;
    console.log(data)
     });
    });
  }



  submit(student : Student){
    console.log(this.student);
    this.service.updateStudent(this.id, this.student).subscribe((res:any) => {
         console.log('Post updated successfully!');
         this.router.navigateByUrl('post/index');
    })
  }
}
