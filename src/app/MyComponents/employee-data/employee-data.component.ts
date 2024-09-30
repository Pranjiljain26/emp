import { Component, inject, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../MaterialImport';
import { SingleEmployeeDataService } from '../../MyServices/single-employee-data.service';
import { EmpsDataService } from '../../MyServices/emps-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeComponent } from '../employee-dialog/edit-employee/edit-employee.component';
import { Route, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-data',
  standalone: true,
  imports: [MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './employee-data.component.html',
  styleUrl: './employee-data.component.css',
})
export class EmployeeDataComponent {
  employee;
  nav;
  constructor(
    private singleEmployeeService: SingleEmployeeDataService,
    private employeeService: EmpsDataService,
    private router: Router
  ) {
    this.employee = signal(singleEmployeeService.getEmployee());

    this.nav = this.router.navigateByUrl(
      `/employee?name=${this.employee().name}`
    );
  }

  deleteEmployee() {
    let confirmDelete = confirm(
      'Do you want to proceed to remove this employee:'
    );
    if (confirmDelete) {
      let removed = this.employeeService.removeEmployee(this.employee());
      if (removed) {
        alert('Employee Deleted successfully');
      } else {
        alert('Employee Does not exist on database');
      }
      this.employee.set({
        name: 'NA',
        position: 'NA',
        email: 'NA',
        joindate: 'NA',
      });
    }
    this.nav = this.router.navigateByUrl(
      `/employee?name=${this.employee().name}`
    );
  }

  // open dialog edit
  readonly editDialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.editDialog.open(EditEmployeeComponent, {
      height: '70%',
      width: '50%',
      data: this.employee(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.employee = this.employeeService.getEmployee();

      alert('Employee edit closed');

      this.employee.set(this.singleEmployeeService.getEmployee());
      console.log(this.employee().name);
      this.nav = this.router.navigateByUrl(
        `/employee?name=${this.employee().name}`
      );
    });
  }
}
