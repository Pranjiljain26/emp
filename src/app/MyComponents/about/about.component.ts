import { Component } from '@angular/core';
import { MaterialModule } from '../../MaterialImport';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
