import { Component, inject, OnChanges, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  RouterLink,
  RouterOutlet,
} from "@angular/router";
import { MaterialModule } from "./MaterialImport";
import { MatDialog } from "@angular/material/dialog";
import { EditEmployeeComponent } from "./MyComponents/employee-dialog/edit-employee/edit-employee.component";
import { EmpsDataService } from "./MyServices/emps-data.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, MaterialModule, RouterLink],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  title: string = "Home";
  showAddingEmployee: any;
  isHome = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private emps: EmpsDataService
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === "/home" || event.url === "/") {
          this.title = "Home";
          this.isHome = true;
        } else if (event.url === "/about") {
          this.title = "About";
          this.isHome = false;
        } else if (event.url.startsWith("/employee")) {
          let a = null;
          this.route.queryParamMap.subscribe((params) => {
            a = { ...params.keys, ...params };
            let eid = a.params["eid"];
            let data = this.emps.getEmployeeById(eid);
            if (data) {
              this.title = data.name;
            }
          });
          this.isHome = false;
        }
      }
    });
  }
  // add employee dialog
  dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      height: "70%",
      width: "50%",
      data: undefined,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // this.router.navigateByUrl("/rerouter");
    });
  }
}
