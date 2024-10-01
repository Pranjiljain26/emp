import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-redirector",
  standalone: true,
  imports: [],
  templateUrl: "./redirector.component.html",
  styleUrl: "./redirector.component.css",
})
export class RedirectorComponent {
  constructor(private router: Router) {
    this.router.navigateByUrl("/");
  }
}
