import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


import { LightsComponent } from './components/lights/lights.component';
import { routes } from './app.routes';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSidenavModule, MatListModule, RouterModule, MatIconModule, MatButtonModule, LightsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'aoc-merhar';
  opened: boolean = true;

  protected dayRoutes = routes.filter(r => r.path == 'day')[0].children;

  constructor() {  console.log("test");
}
}
