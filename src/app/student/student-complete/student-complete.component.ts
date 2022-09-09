import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, Gender, Room, Student } from 'src/app/entities';
import { StudentServiceService } from '../student-service.service';

@Component({
  selector: 'app-student-complete',
  templateUrl: './student-complete.component.html',
  styleUrls: ['./student-complete.component.css']
})
export class StudentCompleteComponent implements OnInit {
 form!: FormGroup;
  id!: string;
  student!: Student;
  course: Course[] =[];
 gender: Gender[]=[];
 room : Room[] =[];
 studentList : Student[]=[];


  constructor(public service : StudentServiceService,
    private route : ActivatedRoute,
    private router : Router,
   private formBuilder : FormBuilder) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];  
    this.service.findStudent(this.id).subscribe((data: Student)=>{
      this.student = data;
      console.log(data);        
    });

     this.form = this.formBuilder.group({
   
     //age :['', Validators.required],
     birthDate :['', Validators.required],
     age :['', Validators.required],
     courseId :['', Validators.required],
     genderId:['', Validators.required],
     roomId : ['',Validators.required],
     street : ['',Validators.required],
     city :['', Validators.required],
     zipCode:['', Validators.required],
     province : ['',Validators.required],
     coutntry : ['',Validators.required],
   })
   this.getAllGenders();
   this.courseAll();
  
  }

    

 f(){return this.form.controls;}

  BindRooms(GenderId : number){
    this.service.getAllStudent().subscribe((data : Student[]) =>{
      this.studentList = data;
      console.log(this.studentList);

    this.service.getAllRooms().subscribe(data =>{
     this.room = data.filter(d=> d.genderId == GenderId && d.students != this.studentList);
      console.log(this.room);
      return this.room;
      // return data.filter(d=>d.genderId == cid);   
    })
    })
   
  }

  getAllGenders(){
     return this.service.getAllGender().subscribe((data : Gender[])=>{
      this.gender = data;
      console.log(data);
    });
  }

  courseAll(){
    this.service.getAllCourses().subscribe((data : Course[])=>{
      this.course = data;
      console.log(data);
    })
  }



  onSubmit(form : FormGroup){
    this.student = new Student();
    this.student.birthDate = this.form.get('birthDate')?.value;
    this.student.courseId = this.form.get('courseId')?.value;
    this.student.roomId = this.form.get('roomId')?.value;
    this.student.genderId =  this.form.get('genderId')?.value;
    this.student.address.street = this.form.get('street')?.value;
    this.student.address.country = this.form.get('country')?.value;
    this.student.address.city = this.form.get('city')?.value;
    this.student.address.zipCode = this.form.get('zipCode')?.value;
    this.student.age = this.form.get('age')?.value;
    
    
    console.log(this.student);
    this.service.updateStudentRoom(this.id, this.student).subscribe((res:any) => {
         console.log('Post updated successfully!');
          this.router.navigateByUrl('Student/dashboard/'+this.id);
    })
  }
}
