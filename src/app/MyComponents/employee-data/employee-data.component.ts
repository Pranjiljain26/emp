import { Employee } from "./../../MyDatatypes/Employee";
import { Component, inject, OnInit, signal } from "@angular/core";
import { MaterialModule } from "../../MaterialImport";
import { EmpsDataService } from "../../MyServices/emps-data.service";
import { MatDialog } from "@angular/material/dialog";
import { EditEmployeeComponent } from "../employee-dialog/edit-employee/edit-employee.component";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AddEmployeeComponent } from "../employee-dialog/add-employee/add-employee.component";

@Component({
  selector: "app-employee-data",
  standalone: true,
  imports: [MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: "./employee-data.component.html",
  styleUrl: "./employee-data.component.css",
})
export class EmployeeDataComponent {
  // nav;
  a;
  employee: Employee;
  constructor(
    private employeeService: EmpsDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.a = { ...params.keys, ...params };
      this.employee = {
        name: this.a.params["name"],
        joindate: this.a.params["joindate"],
        position: this.a.params["position"],
        email: this.a.params["email"],
      };
    });
  }

  deleteEmployee() {
    let confirmDelete = confirm(
      "Do you want to proceed to remove this employee:"
    );
    if (confirmDelete) {
      let removed = this.employeeService.removeEmployee(this.employee);
      if (removed) {
        alert("Employee Deleted successfully");
        this.router.navigateByUrl("/employee");
      } else {
        alert("Employee Does not exist on database");
      }
    }
  }
  // open dialog edit
  readonly editDialog = inject(MatDialog);
  openDialog(): void {
    let dialogRef;
    if (this.employee.name == undefined) {
      let wantToAdd = confirm("Do You want to add a new Employee");
      if (wantToAdd) {
        dialogRef = this.editDialog.open(AddEmployeeComponent, {
          height: "70%",
          width: "50%",
          data: this.employee,
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result !== undefined) {
            this.router.navigate(["/employee"], { queryParams: result });
          }
        });
      }
    } else {
      dialogRef = this.editDialog.open(EditEmployeeComponent, {
        height: "70%",
        width: "50%",
        data: this.employee,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result !== undefined) {
          this.router.navigate(["/employee"], { queryParams: result });
        }
      });
    }
  }
}
