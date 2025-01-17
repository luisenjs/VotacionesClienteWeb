import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private data: DataService) { }

  login(username: string, password: string): Observable<boolean> {
    return this.data.readData<any[]>("https://api-observacion-electoral.frative.com/api/usuarios").pipe(
      map(users => {
        const user = users.find(u => u.identificacion === username && u.identificacion === password);
        if (user && user.rol_id === 2) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          return true;
        }
        return false;
      })
    );
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser")!);
  }

  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.rol_id === 2;
  }

  logout() {
    localStorage.removeItem("currentUser");
  }

}
