import { Component, inject, OnInit } from "@angular/core";
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MaterialModule } from "../../../MaterialImport";
import { EmpsDataService } from "../../../MyServices/emps-data.service";
import { EmployeeDataComponent } from "../../employee-data/employee-data.component";
import { Employee } from "../../../MyDatatypes/Employee";

@Component({
  selector: "app-edit-employee",
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./edit-employee.component.html",
  styleUrl: "./edit-employee.component.css",
})
export class EditEmployeeComponent implements OnInit {
  // dependency injections
  readonly dialogRef = inject(MatDialogRef<EmployeeDataComponent>);
  oldEmployeeData: Employee = inject(MAT_DIALOG_DATA);
  employeeForm = null;
  tempEmployee: Employee;
  // ? employee form
  constructor(private emps: EmpsDataService) {
    if (this.oldEmployeeData === undefined) {
      this.oldEmployeeData = {
        name: "",
        joindate: "",
        email: "",
        position: "",
      };
    }
  }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      name: new FormControl(this.oldEmployeeData.name, [Validators.required]),
      joindate: new FormControl(
        this.oldEmployeeData.joindate,
        Validators.required
      ),
      email: new FormControl(this.oldEmployeeData.email, [
        Validators.email,
        Validators.required,
      ]),
      position: new FormControl(
        this.oldEmployeeData.position,
        Validators.required
      ),
    });
    // setting default values
    this.employeeForm.get("position").setValue(this.oldEmployeeData.position);
    const oldJoinDate = this.oldEmployeeData.joindate;
    const [day, month, year] = oldJoinDate.split("/").map(Number);
    const formattedDate = new Date(year, month - 1, day);
    this.employeeForm.get("joindate").setValue(formattedDate);
  }

  createEmployee() {
    if (this.employeeForm.invalid) {
      alert("Entered data is not correct, please check again");
      return this.oldEmployeeData;
    }
    let newEmp: Employee = {
      name: this.employeeForm.value.name,
      joindate: new Date(this.employeeForm.value.joindate).toLocaleDateString(),
      email: this.employeeForm.value.email,
      position: this.employeeForm.value.position,
    };
    return newEmp;
  }

  updateEmployee() {
    if (!this.employeeForm.invalid) {
      let newEmp = this.createEmployee();
      this.emps.editEmployee(this.oldEmployeeData, newEmp);
      this.dialogRef.close(newEmp);
    }
  }
}
