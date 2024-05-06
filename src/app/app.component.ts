import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserTemplateComponent} from "./user-template/user-template.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserTemplateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MangaDB';
}
