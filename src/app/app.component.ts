import {
  AfterViewChecked,
  Component,
  inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  ActivatedRoute,
  NavigationStart,
  Route,
  Router,
  RouterLink,
  RouterOutlet,
} from "@angular/router";
import { MaterialModule } from "./MaterialImport";
import { HomeComponent } from "./MyComponents/home/home.component";
import { AddEmployeeComponent } from "./MyComponents/employee-dialog/add-employee/add-employee.component";
import { MatDialog } from "@angular/material/dialog";
interface Employee {
  name: string;
  dob: string;
  email: string;
  position: string;
}
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
            // {
            // name: ,
            // }.name;
          });
          this.isHome = false;
        }
      }
    });
  }
  // add employee dialog
  dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      height: "70%",
      width: "50%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigateByUrl("/");
    });
  }
}
