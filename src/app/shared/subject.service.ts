import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../subject.model';
@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  uri = 'http://localhost:8010/api/subjects';

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {}

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.uri);
  }

  deleteSubject(subject: Subject): Observable<string> {
    this.loggingService.log(subject.nom, 'deleted');
    return this.http.delete(`${this.uri}/${subject._id}`, { responseType: 'text' });
  }

  createSubject(subject: Subject): Observable<any> {
    return this.http.post(this.uri, subject);
  }

  getSubject(id: string): Observable<any> {
    return this.http.get(`${this.uri}/${id}`);
  }
}
