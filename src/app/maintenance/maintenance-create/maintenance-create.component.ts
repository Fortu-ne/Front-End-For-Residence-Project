import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Maintenance, MaintenanceType, StatusType, Student } from 'src/app/entities';
import { StudentServiceService } from 'src/app/student/student-service.service';

@Component({
  selector: 'app-maintenance-create',
  templateUrl: './maintenance-create.component.html',
  styleUrls: ['./maintenance-create.component.css']
})
export class MaintenanceCreateComponent implements OnInit {

    maintenance = new Maintenance();
  type !: MaintenanceType[];
  status !: StatusType[];
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
    maintenanceTypeId : ['',Validators.required],
    // statusId:['',Validators.required],
   // maintenanceDate:['',Validators.required],
    studId:(this.studId),
   })
   
   this.form.get('form.studId')?.patchValue(this.studId);
    //this.newForm.controls.firstName.setValue('abc');
  
  
   console.log((this.form.controls['studId']));
   this.getAllTypes();
    // this.getStatuses();
  }


  getAllTypes()
  {
    this.service.getAllMaintenanceType().subscribe((data : MaintenanceType[])=>{
    this.type = data;
    console.log(data)
   });
  }

  // getStatuses()
  // {
  //   this.service.getAllStatutsType().subscribe((data : StatusType[])=>{
  //   this.status = data;
  //   console.log(data);
  //   })
  // }
 
    
     onSubmit()
  {
   console.log(this.form.value)
     this.service.createMaintenance(this.form.value).subscribe((data : Maintenance)=>{
      console.log('Post created successfully');
     this.router.navigateByUrl('Student/dashboard/'+this.studId)
     });
    }
  
}
