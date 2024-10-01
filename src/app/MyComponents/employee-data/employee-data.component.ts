import { Employee } from "./../../MyDatatypes/Employee";
import { Component, inject, signal, WritableSignal } from "@angular/core";
import { MaterialModule } from "../../MaterialImport";
import { EmpsDataService } from "../../MyServices/emps-data.service";
import { MatDialog } from "@angular/material/dialog";
import { EditEmployeeComponent } from "../employee-dialog/edit-employee/edit-employee.component";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, of, single } from "rxjs";

@Component({
  selector: "app-employee-data",
  standalone: true,
  imports: [MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: "./employee-data.component.html",
  styleUrl: "./employee-data.component.css",
})
export class EmployeeDataComponent {
  // snack bar
  private _snackBar = inject(MatSnackBar);

  a;
  // taking eid for the particular employee
  eid: number;
  obj: WritableSignal<Employee>;
  employee: Employee;
  constructor(
    private employeeService: EmpsDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.a = { ...params.keys, ...params };
      this.eid = this.a.params["eid"];
    });
    this.employee = employeeService.getEmployeeById(this.eid);
    this.obj = signal(this.employee);
  }
  // delete dialog
  readonly deleteDialog = inject(MatDialog);

  deleteEmployee() {
    let dialogRef = this.editDialog.open(DeleteDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let removed = this.employeeService.removeEmployee(this.employee);
        if (removed) {
          this._snackBar.open("Employee Deleted Successfully");
          this.router.navigateByUrl("/home");
        }
      }
    });
  }
  // open dialog edit
  readonly editDialog = inject(MatDialog);
  openDialog(): void {
    let dialogRef = this.editDialog.open(EditEmployeeComponent, {
      height: "70%",
      width: "50%",
      data: this.employee,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.obj.set(result);
      }
    });
  }
}
