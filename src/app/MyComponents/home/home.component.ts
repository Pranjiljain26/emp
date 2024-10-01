import { Employee } from "./../../MyDatatypes/Employee";
import { Component, inject } from "@angular/core";
import { EmpsDataService } from "../../MyServices/emps-data.service";
import { MaterialModule } from "../../MaterialImport";
import { MatTableDataSource } from "@angular/material/table";
import { Sort } from "@angular/material/sort";
import { Route, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [MaterialModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  dataSource: MatTableDataSource<Employee>;
  displayedColumns: string[] = [
    "name",
    "joindate",
    "email",
    "position",
    "delete",
  ];
  sortedData: Employee[];
  d1: any;
  dd;
  // snack bar
  private _snackBar = inject(MatSnackBar);
  constructor(private emps: EmpsDataService, private router: Router) {
    const a = emps.getEmployee();
    this.dataSource = new MatTableDataSource(a);
    this.sortedData = this.dataSource.data;
    emps.getTableData().subscribe((data) => {
      this.dd = [...data];
      console.log(data);
      // console.log(typeof data);
    });
  }

  selectedEmployee: Employee;

  selectRow(row: Employee) {
    this.selectedEmployee = row;
  }

  readonly deleteDialog = inject(MatDialog);
  deleteRow(eid) {
    let employee: Employee = this.emps.getEmployeeById(eid);
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let removed = this.emps.removeEmployee(employee);
        if (removed) {
          this._snackBar.open("Employee Deleted Successfully");
        }
      }
    });
  }
  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "name":
          return compare(a.name, b.name, isAsc);
        case "joindate":
          return compareDates(a.joindate, b.joindate, isAsc);
        case "email":
          return compare(a.email, b.email, isAsc);
        case "position":
          return compare(a.position, b.position, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = this.sortedData; // Update data source with sorted data
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareDates(dateStrA: string, dateStrB: string, isAsc: boolean) {
  const dateA = parseDate(dateStrA);
  const dateB = parseDate(dateStrB);

  return (dateA.getTime() - dateB.getTime()) * (isAsc ? 1 : -1);
}

// parsing the dates manually
function parseDate(dateStr: string): Date {
  const [month, day, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}
