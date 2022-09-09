
export class Student{
    public id : string ="";
    public userName : string ="";
    public name :string ="";
    public lastName: string = "";
    public email : string ="";
    public birthDate: string = "";
   public imageUrl: string="";
   public age: number = 0;
   public genderId: number = 0
   public gender : Gender = new Gender();
   public roomId : number = 0;
   public room : Room = new Room();
   public courseId : number = 0;
   public course: Course[] = [];
   public addressId : number = 0;
   public address = new Address();
}
export class Cleaning {
   public  cleaningId: number = 0;
   public  description: string ="";
   public  serviceDate: string = "";
   public  typeId : number = 0;
   public  studId: string ="";
   public student = new Student();
   public cleaningType = new CleaningType();
     
}

export class CleaningType{
  public cleaningTypeId : number = 0;
  public name : string = "";
}
export class Manager{
    
  public id: string = "";
  public name: string = "";
  public lastName : string ="";
  public email :string="";
  public userName: string="";
  public phoneNumber: string ="";
  public dateAppointed : string ="";

}
export class ServiceManager{
        public  managerId : string = "";
        public  userName : string = "";
        public  name : string = "";
        public  lastName: string ="";
        public  phoneNumber : string ="";
}
    
 export class LoginResult{
   
  public userRole: string = "";
  public message : string="";
  public token : string="";
 }
export class Gender{
     public genderId: number =0;
   public genderType:string = "";
   public students : Student[] = [];
   public rooms : Room[] = [];
}

export class Room{
    public roomId : number = 0;
    public roomNum : string = "";
   public floorNumber : string = ""

    //one to one
   public genderId : number = 0;
   public gender : Gender = new Gender();
  public  students: Student[]=[];
}

export class Course{
    public  courseTypeId : number = 0;
   public courseName : string = "";
}

export class Address{
    public addressId : number = 0;
   public street: string = "";
   public city : string = "";
   public zipCode : string ="";
   public province : string = "";
   public country : string = "";
   
}

export class Maintenance{
 
    public maintenanceId : number = 0;
    public description : string = "";
    public maintenanceDate : string = "";
    public statusId : number = 0;
    public status : StatusType = new StatusType();
    public maintenanceTypeId : number = 0
    public maintenanceType : MaintenanceType = new MaintenanceType();
    public studId : string = "";
    public students : Student[] = [];
 
}

export class MaintenanceType{
    public maintenanceTypeId : number = 0;
    public name : string = "";  
}

export class StatusType{ 
    public statusId : number = 0;
    public name : string = "";
 
}

export class JwtToken{
    exp : number = 0;
    Name : string =`http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`;
    Role : string = `schemas.xmlsoap.org/ws/2008/06/identity/claims/role`;
    User: string ="";
    Identfier : string ="";
}

export class currentUser{
       User: string ="";
       Admin : string ="";
       ServManager : string ="";
   
}