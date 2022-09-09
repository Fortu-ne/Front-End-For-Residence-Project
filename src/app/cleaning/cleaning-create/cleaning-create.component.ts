import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cleaning, CleaningType, Student } from 'src/app/entities';
import { StudentServiceService } from 'src/app/student/student-service.service';

@Component({
  selector: 'app-cleaning-create',
  templateUrl: './cleaning-create.component.html',
  styleUrls: ['./cleaning-create.component.css']
})
export class CleaningCreateComponent implements OnInit {

   cleaning = new Cleaning();
  type !: CleaningType[];
  student !: Student;
  form!: FormGroup;
  studId = '';


  constructor(private service: StudentServiceService ,private router : Router,private route :ActivatedRoute,private formBuilder : FormBuilder){}
 
  ngOnInit(): void {
    this.route.parent?.params.subscribe((data : any)=>{
      this.studId = data.id
      console.log(data.id)
    
    })
     this.form = this.formBuilder.group({
    description :['', Validators.required],    
    typeId : ['',Validators.required],
    studId:(this.studId),
   })
   
   this.form.get('form.studId')?.patchValue(this.studId);
   console.log((this.form.controls['studId']));
   this.getAllTypes();
   
  }


  getAllTypes()
  {
    this.service.getAllCleaningTypes().subscribe((data : CleaningType[])=>{
    this.type = data;
    console.log(data)
   });
  }
  
     onSubmit()
  {
   console.log(this.form.value)
     this.service.createCleaning(this.form.value).subscribe((data : Cleaning)=>{
      console.log('Post created successfully');
     this.router.navigateByUrl('Student/dashboard/'+this.studId)
     });
    }
  
}
