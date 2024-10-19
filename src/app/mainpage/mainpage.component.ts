import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationbarComponent } from '../component/navigationbar/navigationbar.component';
import { HeaderComponent } from '../component/header/header.component';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [RouterOutlet, NavigationbarComponent, HeaderComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent {

}
