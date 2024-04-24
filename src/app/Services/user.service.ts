import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl:string;
  private limit:string;

  constructor(private _http:HttpClient) {
   }

  getListUser():Observable<User[]>{
    this.apiUrl = 'https://jsonplaceholder.typicode.com/users?';
    this.limit = '_limit=3';

    let solicitud = this._http.get<User[]>(this.apiUrl + this.limit);
    return solicitud;
  }

  add(modelo:User):Observable<User>{
    return;
  }

  update(id:number):Observable<User>{
    return;
  }

  delete(id:number):Observable<void>{
    return;
  }


}
