import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData<T>(url: string): Observable<T> {
    console.log("getting data")
    return this.http.get<T>(url);
  }

}
