import { Employee } from "./../../MyDatatypes/Employee";
import { Component, inject } from "@angular/core";
import { MaterialModule } from "../../MaterialImport";
import { EmpsDataService } from "../../MyServices/emps-data.service";
import { MatDialog } from "@angular/material/dialog";
import { EditEmployeeComponent } from "../employee-dialog/edit-employee/edit-employee.component";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";

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
  // delete dialog
  readonly deleteDialog = inject(MatDialog);

  deleteEmployee() {
    let dialogRef = this.editDialog.open(DeleteDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let removed = this.employeeService.removeEmployee(this.employee);
        if (removed) {
          alert("Employee Deleted successfully");
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
        this.router.navigate(["/employee"], { queryParams: result });
      }
    });
  }
}
