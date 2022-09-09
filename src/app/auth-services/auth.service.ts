import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, ObservedValueOf, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Login,ResetPasswordDto,SignUp } from '../authentication/model';
import { ServiceManager,Manager } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  
   httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

getToken(){
  return localStorage.getItem('authToken')
}

isAuthenticated() : boolean {
return this.getToken() !== null;
}

logout() {
localStorage.removeItem('authToken');


}


  public register(user : SignUp) : Observable<any>
  {
   return this.http.post<any>('https://localhost:7294/api/Account/Manager/Register',user)
  }


  public StudentSignUp(user : SignUp) : Observable<any>
  {
   return this.http.post<any>('https://localhost:7294/api/Account/Student/Register',user)
  }

  
  public ServiceSignup(user : SignUp) : Observable<any>
  {
   return this.http.post<any>('https://localhost:7294/api/Account/ServiceManagement/Student',user)
  }

   public login(user : Login) : Observable<string>
  {
  return this.http.post('https://localhost:7294/api/Account/Login',user, {responseType:'text'})
  }


   public verfication(verify : string){
    return this.http.get('https://localhost:7294/api/Account/ConfirmEmailLink?token='+verify)
   };

  public GetMe() : Observable<string>
  {
    return this.http.get('https://localhost:7294/api/Auth', {responseType : 'text'});
  }

  public resetPassword(reset : ResetPasswordDto)
  {
    return this.http.post(`https://localhost:7294/api/Account/Reset-Password`, reset).pipe(catchError(this.handleError));
  }

  public forgotPassword(email : string){
    return this.http.post(`https://localhost:7294/api/Account/Forgot-Password`,JSON.stringify(email), this.httpOptions).pipe(catchError(this.handleError));
  }

  public exportMaintenancePdf(){
   return this.http.get('https://localhost:7294/Api/Export/Maintenance/Pdf', {observe:'response',responseType:'blob'})
  }

  public exportMaintenanceExcel(){
    return this.http.get('https://localhost:7294/Api/Export/Maintenance/Excel', {observe:'response',responseType:'blob'})
  }

  public exportCleaningPdf(){
return this.http.get('https://localhost:7294/Api/Export/Cleaning/Excel', {observe:'response',responseType:'blob'})
  }

  public exportCleaningExcel(){
return this.http.get('https://localhost:7294/Api/Export/Cleaning/Pdf', {observe:'response',responseType:'blob'})
  }


  public exportStudentPdf(){
    return this.http.get('https://localhost:7294/Api/Export/Student/Pdf', {observe:'response',responseType:'blob'})
  }

   public exportStudentExcel(){
    return this.http.get('https://localhost:7294/Api/Export/Student/Excel',{observe:'response',responseType:'blob'})
  }

  public getManager(id : string) : Observable<Manager>
  {
    return this.http.get<Manager>('https://localhost:7294/api/Manager/'+id).pipe(
      catchError(this.handleError));
  }

  public getServiceManager(id : string):Observable<ServiceManager>
  {
     return this.http.get<ServiceManager>('https://localhost:7294/api/ServiceManagement/'+id).pipe(
      catchError(this.handleError));;
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
}
}
