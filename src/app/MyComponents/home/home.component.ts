import { Component, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { EmpsDataService } from "../../MyServices/emps-data.service";
import { Employee } from "../../MyDatatypes/Employee";
import { MaterialModule } from "../../MaterialImport";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [MaterialModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  dataSource: MatTableDataSource<Employee>;
  displayedColumns: string[] = ["name", "joindate", "email", "position"];

  // Bind MatSort to the table
  @ViewChild(MatSort) sort: MatSort;

  constructor(private emps: EmpsDataService) {
    const employees = emps.getEmployee();
    this.dataSource = new MatTableDataSource(employees);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  selectedEmployee: Employee;

  selectRow(row: Employee) {
    this.selectedEmployee = row;
  }
}
