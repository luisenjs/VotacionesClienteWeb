import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
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

  createData<T>(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data);
  }

  readData<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  readDataById<T>(url: string, id: string): Observable<T> {
    return this.http.get<T>(`${url}/${id}`);
  }

  updateDataById<T>(url: string, id: string, data: T): Observable<T> {
    return this.http.put<T>(`${url}/${id}`, data);
  }

  deleteDataById(url: string, id: string): Observable<void> {
    return this.http.delete<void>(`${url}/${id}`);
  }

  sendEmail<T>(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data);
  }

}
