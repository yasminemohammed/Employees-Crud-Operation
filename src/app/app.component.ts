import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from './Models/employee';
import { EmployeeService } from './Services/employee.service';
import { AfterViewInit, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit
{
  title = 'Employees_Crud_Operations_Project';
  @Input() employee: Employee;
  @Output() onEditEmployee = new EventEmitter<number>();
  @ViewChild('Input') Input: any;
  @ViewChild('addnewEmployee') addnewEmployee: any;
  EmployeeForm: FormGroup;
  EMPS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  Employees: Employee[];
  employeesToDisplay: Employee[];
  addEmployeeButton: any;
  constructor(
    private Form: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.EmployeeForm = Form.group({});
    this.Employees = [];
    this.employeesToDisplay = this.Employees;
    console.log(this.employeesToDisplay);
    console.log(this.Employees);
    this.employee = {
      empId:0,
      empName: '',
      empEmail: '',
      empAddress: '',
      empPhone:'',

    };

  }


  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getEmployees();
    this.Pagination();
    console.log(this.employee);
    this.EmployeeForm = this.Form.group({
      empName: this.Form.control('',Validators.required),
      empEmail: this.Form.control('',[Validators.required,Validators.email]),
      empAddress: this.Form.control('',[Validators.required,Validators.maxLength(11),Validators.minLength(11)]),
      empPhone: this.Form.control('',Validators.required),

    });

    this.employeeService.getEmployees().subscribe((res) => {
      for (let emp of res) {
        this.Employees.unshift(emp);
      }
      this.employeesToDisplay = this.Employees;
    });
  }

  addEmployee() {
    let employee: Employee = {
      empId: 0,
      empName: this.Name.value,
      empEmail: this.Email.value,
      empAddress: this.Address.value,
      empPhone: this.PhoneNo.value,
    };
    this.employeeService.addEmployee(employee).subscribe((res) => {
      this.Employees.unshift(res);
      this.clearForm();
    });
    }



    editEmployee(event: any) {
      this.Employees.forEach((val, ind) => {
        if (val.empId === event) {
          this.setForm(val);
        }
      });
      this.addnewEmployee.nativeElement.click();    }

    setForm(emp: Employee) {
      this.Name.setValue(emp.empName);
      this.Email.setValue(emp.empEmail);
      this.Address.setValue(emp.empAddress);
      this.PhoneNo.setValue(emp.empPhone);
    }



    clearForm() {
      this.Name.setValue('');
      this.Email.setValue('');
      this.Address.setValue('');
      this.PhoneNo.setValue('');

    }



public get Name(): FormControl {
  return this.EmployeeForm.get('empName') as FormControl;
}
public get Email(): FormControl {
  return this.EmployeeForm.get('empEmail') as FormControl;
}
public get Address(): FormControl {
  return this.EmployeeForm.get('empAddress') as FormControl;
}
public get PhoneNo(): FormControl {
  return this.EmployeeForm.get('empPhone') as FormControl;
}


Pagination(): void {
  this.employeeService.getEmployees().subscribe((response) => {
      this.EMPS = response;
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
}
onTableDataChange(event: any) {
  this.page = event;
  this.Pagination();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.Pagination();
}
getEmployees():void {
  this.employeeService.getEmployees().subscribe(Employees => this.Employees = Employees);
}

  checkAllCheckBox(ev: any) {
  this.Employees.forEach(x => x.checked = ev.target.checked)
}

isAllCheckBoxChecked() {
  return this.Employees.every(p => p.checked);
  }

  // deleteEmployees(){
  //   this.EmployeeService.deleteEmployee(this.employee.empId).subscribe( data => {
  //     console.log(data);
  //     this.getEmployees();
  //   })
  // }

  editEmployeeClicked(){
    this.onEditEmployee.emit(this.employee.empId);
  }

}
