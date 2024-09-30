import { Component, inject, OnInit } from "@angular/core";
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
  constructor(private router: Router, private route: ActivatedRoute) {}
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
          this.route.queryParamMap.subscribe((params) => {
            let a;
            a = { ...params.keys, ...params };
            this.title = a.params["name"];
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
      this.router.navigateByUrl("/");
    });
  }
}
