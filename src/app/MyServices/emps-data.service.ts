import { Injectable, signal } from "@angular/core";
import { Employee } from "../MyDatatypes/Employee";
import { C } from "@angular/cdk/keycodes";
import { BehaviorSubject, of } from "rxjs";
// employees interface

@Injectable({
  providedIn: "root",
})
export class EmpsDataService {
  // observable sent for data in table
  data;

  private employees: Employee[];
  constructor() {
    this.employees = [
      {
        eid: 1,
        name: "Grace",
        joindate: "20/04/1991",
        email: "grace@xyz.com",
        position: "Hr",
      },
      {
        eid: 2,
        name: "Hank",
        joindate: "28/02/1994",
        email: "hank@xyz.com",
        position: "Developer",
      },
      {
        eid: 3,
        name: "Alice",
        joindate: "15/03/1990",
        email: "alice@xyz.com",
        position: "manager",
      },
      {
        eid: 4,
        name: "Bob",
        joindate: "22/07/1995",
        email: "bob@xyz.com",
        position: "manager",
      },
      {
        eid: 5,
        name: "Charlie",
        joindate: "30/11/1988",
        email: "charlie@xyz.com",
        position: "Developer",
      },
      {
        eid: 6,
        name: "Diana",
        joindate: "10/01/1992",
        email: "diana@xyz.com",
        position: "Developer",
      },
      {
        eid: 7,
        name: "Eve",
        joindate: "25/05/1993",
        email: "eve@xyz.com",
        position: "Hr",
      },
      {
        eid: 8,
        name: "Frank",
        joindate: "14/09/1985",
        email: "frank@xyz.com",
        position: "Developer",
      },
      {
        eid: 9,
        name: "Ivy",
        joindate: "12/06/1997",
        email: "ivy@xyz.com",
        position: "manager",
      },
      {
        eid: 10,
        name: "Jack",
        joindate: "05/10/1986",
        email: "jack@xyz.com",
        position: "Developer",
      },
    ];
    this.data = new BehaviorSubject<Employee[]>(this.employees);
  }
  getEmployee() {
    return this.employees;
  }
  getTableData() {
    return this.data;
  }
  removeEmployee(employee: Employee) {
    let index = this.employees.map((x) => x.eid).indexOf(employee.eid);
    if (index != -1) {
      this.employees.splice(index, 1);
      this.data.next(this.employees);
      return true;
    } else {
      return false;
    }
  }

  editEmployee(oldEmployeeData: Employee, newEmployeeData: Employee) {
    // if old employee does not exist we will add the employee, else update
    let index = this.employees.indexOf(oldEmployeeData);
    if (index !== -1) {
      this.employees.splice(index, 1, newEmployeeData);
    } else {
      // ? assigning a new eid if the employee does not exist already
      newEmployeeData.eid = this.employees.length + 1;
      this.employees.push(newEmployeeData);
    }
    this.data.next(this.employees);
  }
  // employee by eid
  getEmployeeById(emp_id: number) {
    for (let emp of this.employees) {
      if (emp.eid == emp_id) {
        return emp;
      }
    }
    return null;
  }
}
