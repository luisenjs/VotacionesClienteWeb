import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData<T>(archivo: string): Observable<T> {
    const filepath = 'assets/data/${archivo}.json'
    return this.http.get<T>(archivo);
  }

  getElementos(tipo: string): Observable<any[]> {
    let url = '';

    switch (tipo) {
      case 'binomio':
        url = 'assets/data/binomio.json';
        break;
      case 'organizacion':
        url = 'assets/data/organizacion.json';
        break;
      case 'consulta':
        url = 'assets/data/consulta.json';
        break;
    }

    return this.http.get<any[]>(url);
  }

}
