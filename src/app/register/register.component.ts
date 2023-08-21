import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


  formValue!: FormGroup;
  // data:undefined|StudentModel[];
  studentModelObj : StudentModel = new StudentModel();
  studentData !: any;
  showAdd!: boolean;
  showUpdate! : boolean;
  constructor(private formbuilber: FormBuilder, private http:HttpClient,
    private api : ApiService){}
  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      name : [''],
      place: [''],
      mobile: ['']
    })
    this.getAllStudent();
  }

clickAddStudent(){
  this.formValue.reset();
  this.showAdd = true;
  this.showUpdate = false;
}
  // getstudent() {
  //   throw new Error('Method not implemented.');
  // }
  postStudentDetails(){
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.place = this.formValue.value.place;
    this.studentModelObj.mobile = this.formValue.value.mobile;

  // postStudentDetails(data:StudentModel){
  //   if(data){
  //   this.api.PostStudent(data).subscribe((res:any)=>{
  //     this.formValue.reset();
  //   })
    // this getstudent();
  

    this.api.postStudent(this.studentModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("student added successfully to the list")
      let ref =document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllStudent();
    },
    err=>{
      alert("it's wrong");
    })   
    
  }
  getAllStudent(){
    this.api.getStudent()
    .subscribe ((res: any)=>{
      this.studentData = res;

    })
  }
  deleteStudent(id:any){
    this.api.deleteStudent(id)
    .subscribe(res=>{
      alert("i'm working")
    })
    this.getAllStudent();
    
  }
  onEdit(list : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.id = list.id;
    this.formValue.controls['name'].setValue(list.name);
    this.formValue.controls['place'].setValue(list.place);
    this.formValue.controls['mobile'].setValue(list.mobile);
  }
  updateStudentDetails(){
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.place = this.formValue.value.place;
    this.studentModelObj.mobile = this.formValue.value.mobile;

    this.api.updateStudent(this.studentModelObj,this.studentModelObj.id)
    .subscribe (res=>{
      alert("updated")
      let ref =document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllStudent();
    })
  }
}

