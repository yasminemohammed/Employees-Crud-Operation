import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({

  providedIn: 'root'
})
export class EmployeeService {
  deleteEmpUrl :string;
  list: Employee[] = [];
    private baseUrl = 'http://task.soft-zone.net/api/Employees';

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    } // URL to REST API
    constructor(private httpClient: HttpClient) {
      this.deleteEmpUrl = 'http://task.soft-zone.net/api/Employees/deleteEmpByID';
    }



    //show all employees
    getEmployees():Observable<Employee[]> {
      return this.httpClient.get<Employee[]>(this.baseUrl + '/getAllEmployees');
    }

    //add new employees
    addEmployee(employee: Employee){
      return this.httpClient.post<Employee>(this.baseUrl  + '/addEmployee', employee);
    }
    // `http://task.soft-zone.net/api/Employees/getEmpByID/${id}`

    // getEmployeeById(emp_id:any):Observable<Employee>
    // {
    //   return this.httpClient.get<Employee>(`http://task.soft-zone.net/api/Employees/getEmpByID/${emp_id}`);
    // }
    deleteEmployee(emp : Employee) : Observable<Employee> {
      return this.httpClient.delete<Employee>(this.deleteEmpUrl+'/'+emp.empId);
    }

}
