import { Component, inject, model } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../MaterialImport';
import { EmpsDataService } from '../../../MyServices/emps-data.service';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [MaterialModule, FormsModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AddEmployeeComponent {
  employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    joindate: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    position: new FormControl('', Validators.required),
  });
  readonly dialogRef = inject(MatDialogRef<AddEmployeeComponent>);
  constructor(private emps: EmpsDataService) {}
  addEmployee() {
    if (this.employeeForm.invalid) {
      alert('Entered data is not correct, please check again');
      return;
    }
    let newEmp = {
      name: this.employeeForm.value.name,
      joindate: new Date(this.employeeForm.value.joindate).toLocaleDateString(),
      email: this.employeeForm.value.email,
      position: this.employeeForm.value.position,
    };
    this.emps.addEmployee(newEmp);

    this.dialogRef.close();
  }
  closeDialog() {
    console.log('added a row');
  }
}
