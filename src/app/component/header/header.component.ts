import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  user: any;
  
  constructor(private auth: AuthService) {
    this.user = auth.getCurrentUser();
  }
  
  logout(){
    this.auth.logout();
    window.location.reload();
  }

}
