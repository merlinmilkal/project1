import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators'
import { StudentModel } from '../register/student.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  
  
  // getStudent() {
  //   throw new Error('Method not implemented.');
  // }
  

  constructor(private _http : HttpClient) { }
//   StudentDetails(data:StudentModel){
// return this.http.post<StudentModel>("http://localhost:3000/posts",data)
//   }


  postStudent(data : any){
    return this._http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getStudent(){
    return this._http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  // deleteStudent(id : number){
  //   return this._http.delete<any>("http://localhost:3000/posts/"+id)
  //   .pipe(map((res:any)=>{
  //     return res;
  //   }))
  // }
  deleteStudent(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id)
    
  }
  updateStudent(data :any,id: number){
    return this._http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
