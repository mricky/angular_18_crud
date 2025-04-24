import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
   employeeForm: FormGroup = new FormGroup({})
   
   employeeObj: EmployeeModel = new EmployeeModel();
   employeeList: EmployeeModel[] = [];

   constructor(){
    this.createForm();
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData = JSON.parse(oldData)
      this.employeeList = parseData
    }
  
  }
  onReset(){
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }
   createForm(){
    this.employeeForm = new FormGroup({
       // empid: new FormControl();
       empid : new FormControl(this.employeeObj.empid),
       name : new FormControl(this.employeeObj.name,[Validators.required]),
       emailid : new FormControl(this.employeeObj.emailid),
       state : new FormControl(this.employeeObj.state),
       city : new FormControl(this.employeeObj.city),
       address : new FormControl(this.employeeObj.address),
       contactno : new FormControl(this.employeeObj.contactno),
       pincode : new FormControl(this.employeeObj.pincode,[Validators.required,Validators.minLength(6)])
      })
   }

   onSave(){
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData = JSON.parse(oldData)
      this.employeeForm.controls['empid'].setValue(parseData.length +1)
      this.employeeList.unshift(this.employeeForm.value)
   
    } else {
      this.employeeList.unshift(this.employeeForm.value)  
     
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList))  
   }

   onEdit(item: EmployeeModel){
      this.employeeObj = item;
      this.createForm()
   }
   onUpdate(){
      const record = this.employeeList.find(m=>m.empid == this.employeeForm.controls['empid'].value);

      if(record != undefined){
         record.name = this.employeeForm.controls['name'].value;
         record.emailid = this.employeeForm.controls['emailid'].value;
         record.state = this.employeeForm.controls['state'].value;
         record.city = this.employeeForm.controls['city'].value;
         record.contactno = this.employeeForm.controls['contactno'].value;
         record.pincode = this.employeeForm.controls['pincode'].value;
      }

      localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
      this.onReset();
   }
   onDelete(id: number){
      const isDelete = confirm("Are you sure want to Delete ?");
      if(isDelete){
        const index = this.employeeList.findIndex(m=>m.empid == id);

        this.employeeList.splice(index,1)
        localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
      }
   }

}
