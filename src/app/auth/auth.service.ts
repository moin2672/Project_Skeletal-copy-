import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { 

  }

  createUser(email:string, password:string){
    const authData:AuthData={email:email, password:password}
    this.httpClient.post("http://localhost:3002/api/users/signup", authData)
                    .subscribe(response=>{
                      console.log(response);
                    });
  }

}
