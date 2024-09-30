import { Routes } from "@angular/router";
import { EmployeeDataComponent } from "./MyComponents/employee-data/employee-data.component";
import { AboutComponent } from "./MyComponents/about/about.component";
import { HomeComponent } from "./MyComponents/home/home.component";

export const routes: Routes = [
  // { path: "employee", component: EmployeeDataComponent },
  { path: "home", component: HomeComponent },
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "employee", component: EmployeeDataComponent },
];
