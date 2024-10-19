import { Component } from '@angular/core';
import { UndermaintenanceComponent } from '../undermaintenance/undermaintenance.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UndermaintenanceComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
