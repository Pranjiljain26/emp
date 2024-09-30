import { Routes } from "@angular/router";
import { EmployeeDataComponent } from "./MyComponents/employee-data/employee-data.component";
import { AboutComponent } from "./MyComponents/about/about.component";
import { HomeComponent } from "./MyComponents/home/home.component";
import { RedirectorComponent } from "./MyComponents/redirector/redirector.component";

export const routes: Routes = [
  // { path: "employee", component: EmployeeDataComponent },
  { path: "home", redirectTo: "" },
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "employee", component: EmployeeDataComponent },
  { path: "router", component: RedirectorComponent },
];
