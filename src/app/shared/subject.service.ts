import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from '../models/subject.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  uri = 'https://backm1miage.onrender.com/api/subjects';
  httpOptions() {
    return {
      headers: new HttpHeaders({
       'Authorization': 'Bearer ' + localStorage.getItem('token'),
       'Access-Control-Allow-Origin': '*'
      }),
     };
  }

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.uri, this.httpOptions());
  }

  deleteSubject(subject: Subject): Observable<any> {
    return this.http.delete(`${this.uri}/${subject._id}`, this.httpOptions());
  }

  createSubject(subject: Subject): Observable<any> {
    return this.http.post(this.uri, subject, this.httpOptions());
  }

  getSubject(id: string): Observable<any> {
    return this.http.get(`${this.uri}/${id}`, this.httpOptions());
  }

  updateAssignment(subject: Subject): Observable<any> {
    return this.http.put<Subject>(this.uri, subject, this.httpOptions());
  }
}
