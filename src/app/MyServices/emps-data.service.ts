import { Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { SingleEmployeeDataService } from "./single-employee-data.service";
import { Employee } from "../MyDatatypes/Employee";
// employees interface

@Injectable({
  providedIn: "root",
})
export class EmpsDataService {
  private employees: Employee[];
  constructor() {
    this.employees = [
      {
        name: "Grace",
        joindate: "20/04/1991",
        email: "grace@xyz.com",
        position: "Hr",
      },
      {
        name: "Hank",
        joindate: "28/02/1994",
        email: "hank@xyz.com",
        position: "Developer",
      },
      {
        name: "Alice",
        joindate: "15/03/1990",
        email: "alice@xyz.com",
        position: "manager",
      },
      {
        name: "Bob",
        joindate: "22/07/1995",
        email: "bob@xyz.com",
        position: "manager",
      },
      {
        name: "Charlie",
        joindate: "30/11/1988",
        email: "charlie@xyz.com",
        position: "Developer",
      },
      {
        name: "Diana",
        joindate: "10/01/1992",
        email: "diana@xyz.com",
        position: "Developer",
      },
      {
        name: "Eve",
        joindate: "25/05/1993",
        email: "eve@xyz.com",
        position: "Hr",
      },
      {
        name: "Frank",
        joindate: "14/09/1985",
        email: "frank@xyz.com",
        position: "Developer",
      },

      {
        name: "Ivy",
        joindate: "12/06/1997",
        email: "ivy@xyz.com",
        position: "manager",
      },
      {
        name: "Jack",
        joindate: "05/10/1986",
        email: "jack@xyz.com",
        position: "Developer",
      },
    ];
  }
  getEmployee() {
    return this.employees;
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  removeEmployee(employee: Employee) {
    let index = this.employees.map((x) => x.name).indexOf(employee.name);
    if (index != -1) {
      this.employees.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  editEmployee(oldEmployeeData: Employee, newEmployeeData: Employee) {
    this.employees.splice(
      this.employees.indexOf(oldEmployeeData),
      1,
      newEmployeeData
    );
  }
}
