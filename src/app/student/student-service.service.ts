import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cleaning, CleaningType, Course, Gender, Maintenance, MaintenanceType, Room, StatusType, Student } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private studentUrl = "Student";
  private roomUrl = "Room";
  private cascadeUrl = "Cascade";
  private genderUrl ="Gender";
  private courseUrl = "Course";
  private maintenanceUrl = "Maintenance";
  private maintenanceTypeUrl = "MaintenanceType";
  private statusUrl = "Status";

  

  constructor(private http :HttpClient) { }

    httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
    }


      getAllStudent():Observable<Student[]>{
    return this.http.get<Student[]>(`${environment.baseApiUrl}/${this.studentUrl}/List`).pipe(
      catchError(this.handleError));
  }

  createStudent(student : any):Observable<Student>{
   return this.http.post<any>(`${environment.baseApiUrl}/${this.studentUrl}`, student,this.httpOptions).pipe(
      catchError(this.handleError));
  }
  findStudent(id: string): Observable<Student>{
    return this.http.get<Student>(`${environment.baseApiUrl}/${this.studentUrl}/`+ id).pipe(
      catchError(this.handleError));
  }

  deleteStudent(id:string): Observable<Student>{
    return this.http.delete<Student>( `${environment.baseApiUrl}/${this.studentUrl}/`+ id).pipe(
      catchError(this.handleError));
  }

  updateStudent(id : string,student: Student): Observable<Student>{
    return this.http.put<Student>(`${environment.baseApiUrl}/${this.studentUrl}/`+ id, JSON.stringify(student),this.httpOptions).pipe(
      catchError(this.handleError));
  }

  // SelectRoom/Gender
  updateStudentRoom(id : string, student : any) : Observable<Student>
  {
    return this.http.put<any>('https://localhost:7294/api/Student/SelectRoom/'+id, JSON.stringify(student),this.httpOptions).pipe(
      catchError(this.handleError));
  }

  // Gender
  getAllGender(): Observable<Gender[]>{
    return this.http.get<Gender[]>(`${environment.baseApiUrl}/${this.genderUrl}`).pipe(
      catchError(this.handleError));
  }



// Room Api
  getAllRooms(): Observable<Room[]>{
    return this.http.get<Room[]>(`${environment.baseApiUrl}/${this.roomUrl}`).pipe(
      catchError(this.handleError));
  }

  createRoom(room : Room){
    return this.http.post(`${environment.baseApiUrl}/${this.roomUrl}`, room).pipe(
      catchError(this.handleError));
  }

  findRoom(id: number|string) : Observable<Room>{
return this.http.get<Room>(`${environment.baseApiUrl}/${this.roomUrl}/${id}`).pipe(
      catchError(this.handleError));
  }

  updateRoom(id:number|string, data:Room){
    return this.http.put(`${environment.baseApiUrl}/${this.roomUrl}/${id}`,data).pipe(
      catchError(this.handleError));
  }

   deleteRoom(id:number): Observable<Room>{
    return this.http.delete<Room>( `${environment.baseApiUrl}/${this.roomUrl}/`+ id).pipe(
      catchError(this.handleError));
  }

  
  getRoomByGender(id:number) {
    return this.http.get(`${environment.baseApiUrl}/${this.cascadeUrl}/genderId?genderId=` + id).pipe(
      catchError(this.handleError));
  }

 // Courses
  getAllCourses() : Observable<Course[]>{
    return this.http.get<Course[]>(`${environment.baseApiUrl}/${this.courseUrl}`).pipe(
      catchError(this.handleError));
  }  


  getCourse(id : number) {
     return this.http.get<Course>(`${environment.baseApiUrl}/${this.courseUrl}/` + id).pipe(
      catchError(this.handleError));
  }

  // Gender
  getGender(id:number){
    return this.http.get<Gender>(`${environment.baseApiUrl}/${this.genderUrl}/` + id).pipe(
      catchError(this.handleError));
  }

  // Maintenance

  createMaintenance(maintenance : Maintenance) : Observable<Maintenance>{
    return this.http.post<Maintenance>(`${environment.baseApiUrl}/${this.maintenanceUrl}/Create`,maintenance,this.httpOptions).pipe(
      catchError(this.handleError));
  }
  getALllMaintenance() :Observable<Maintenance[]>{
    return this.http.get<Maintenance[]>(`${environment.baseApiUrl}/${this.maintenanceUrl}`).pipe(
     catchError(this.handleError));
  }

  updateMaintenance(id : number, maintenance : Maintenance) {
   return this.http.put(`${environment.baseApiUrl}/${this.maintenanceUrl}/`+id, maintenance,this.httpOptions).pipe(
      catchError(this.handleError));
  }

  deleteMaintenance(id : number){
    return this.http.delete(`${environment.baseApiUrl}/${this.maintenanceUrl}/`+id).pipe( catchError(this.handleError));
  }
  
  getMaintenance(id:number){
    return this.http.get<Maintenance>(`${environment.baseApiUrl}/${this.maintenanceUrl}/` + id).pipe(
      catchError(this.handleError));
  }


    // MaintenanceType
    getAllMaintenanceType():Observable<MaintenanceType[]>{
       return this.http.get<MaintenanceType[]>(`${environment.baseApiUrl}/${this.maintenanceTypeUrl}/`).pipe(
     catchError(this.handleError));
    }

    getMaintenaceType(id:number){
       return this.http.get<MaintenanceType>(`${environment.baseApiUrl}/${this.maintenanceTypeUrl}/` + id).pipe(
      catchError(this.handleError));
    }


    // Status Type
    getAllStatutsType(): Observable<StatusType[]>{
        return this.http.get<StatusType[]>(`${environment.baseApiUrl}/${this.statusUrl}`).pipe(
     catchError(this.handleError));
    }

    getStatus(id: number) 
    {
       return this.http.get<MaintenanceType>(`${environment.baseApiUrl}/${this.statusUrl}/` + id).pipe(catchError(this.handleError));    }
      

       // Cleaning
      getAllCleaning() : Observable<Cleaning[]>{
        return this.http.get<Cleaning[]>('https://localhost:7294/Api/Cleaning').pipe(
     catchError(this.handleError));
      }

      //Create Cleaning
      createCleaning(cleaning : Cleaning) :Observable<Cleaning>{
        return this.http.post<Cleaning>('https://localhost:7294/Api/Cleaning', cleaning,this.httpOptions).pipe(
     catchError(this.handleError));
      }

    deleteCleaning( id : number):Observable<Cleaning>{
        return this.http.delete<Cleaning>('https://localhost:7294/Api/Cleaning/'+id ,this.httpOptions).pipe(
     catchError(this.handleError));
      }

      //CLeaning Types
      getAllCleaningTypes() : Observable<CleaningType[]>{
        return this.http.get<CleaningType[]>('https://localhost:7294/Api/Cleaning/CleaningType').pipe(
     catchError(this.handleError));
      }

    
    
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
