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

}
