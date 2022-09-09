import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerServiceService {

  constructor(private http : HttpClient) { }

  findManager(id : string){
    return this.http.get('https://localhost:7294/api/Manager/'+id);
  }

   updateManager(id : string){
    return this.http.get('https://localhost:7294/api/Manager/'+id);
  }
}
