import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import {ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '_types/User';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl:string = environment.ApiUrl ;

  private currentUserSource = new ReplaySubject<User>(1);

  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient, private router:Router) { }


  register(user){
    return this.http.post(this.baseUrl+"Account/register",user);
  }



  login(user){

    return this.http.post(this.baseUrl+"Account/login",user).pipe(
      map((response:User)=>{ 
        if(response!= null) {
          localStorage.setItem('user',JSON.stringify(response));
          this.currentUserSource.next(response);
          console.log(response);
      }
      }
      )
    );
  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigate(["home"]);
  }


}
