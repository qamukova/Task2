import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly BASE_USERS_URL = 'http://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_USERS_URL);
  }

  getUserDetails(id: string): Observable<any> {
    return this.http.get<any>(this.BASE_USERS_URL + `/${id}`);
  }
}
