import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token;

  constructor(private httpClient:HttpClient) { 

  }

  getToken(){
    return this.token;
  }

  createUser(email:string, password:string){
    const authData:AuthData={email:email, password:password}
    this.httpClient.post("http://localhost:3002/api/users/signup", authData)
                    .subscribe(response=>{
                      console.log(response);
                    });
  }
  loginUser(email:string, password:string){
    const authData:AuthData={email:email, password:password}
    this.httpClient.post<{token:string}>("http://localhost:3002/api/users/login", authData)
                    .subscribe(response=>{
                      // console.log(response);
                      const token = response.token;
                      this.token=token;
                    });
  }
}
