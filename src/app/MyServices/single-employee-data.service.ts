import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { Employee } from '../MyDatatypes/Employee';

@Injectable({
  providedIn: 'root',
})
export class SingleEmployeeDataService {
  singleEmployee: Employee = {
    name: 'NA',
    joindate: 'NA',
    email: 'NA',
    position: 'NA',
  };
  emptyObject: Employee = {
    name: 'NA',
    joindate: 'NA',
    email: 'NA',
    position: 'NA',
  };
  constructor() {}
  setEmployee(singleEmployee: Employee) {
    this.singleEmployee = singleEmployee;
  }
  // if first time loading, it will return a empty ibject
  getEmployee() {
    return this.singleEmployee == null ? this.emptyObject : this.singleEmployee;
  }
}
