import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnInit {
  @Input() employee: Employee;
  @Output() onRemoveEmployee = new EventEmitter<number>();
  @Output() onEditEmployee = new EventEmitter<number>();

  EMPS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  Employees: Employee[] = [];
  empService: any;
	constructor(private EmployeeService: EmployeeService) {

    this.employee = {
      empId:0,
      empName: '',
      empEmail: '',
      empAddress: '',
      empPhone:'',

    };


  }

	ngOnInit() {
		this.getEmployees();
    this.Pagination();
    console.log(this.employee);
	}

  Pagination(): void {
    this.EmployeeService.getEmployees().subscribe((response) => {
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
		this.EmployeeService.getEmployees().subscribe(Employees => this.Employees = Employees);
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


deleteEmployee(emp : Employee) {

  this.empService.deleteEmployee(emp).subscribe((res: any)=>{
    console.log(res);
    this.getEmployees();
  },(err: any) => {
    console.log(err);
  });

}


  }
