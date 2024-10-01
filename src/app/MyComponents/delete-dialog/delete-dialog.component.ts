import { Component, inject, OnDestroy } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { EmployeeDataComponent } from "../employee-data/employee-data.component";
import { MaterialModule } from "../../MaterialImport";

@Component({
  selector: "app-delete-dialog",
  standalone: true,
  imports: [MaterialModule],
  templateUrl: "./delete-dialog.component.html",
  styleUrl: "./delete-dialog.component.css",
})
export class DeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EmployeeDataComponent>);
  isConfirm: boolean;
  constructor() {
    this.isConfirm = false;
  }
  confirmDelete() {
    this.isConfirm = true;
    this.dialogRef.close(this.isConfirm);
  }
}
