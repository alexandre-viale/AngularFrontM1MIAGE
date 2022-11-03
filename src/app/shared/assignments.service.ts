import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignment[] = []
  uri = 'http://localhost:8010/api/assignments';

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {}

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri);
  }

  deleteAssignment(assignment: Assignment): Observable<string> {
    this.loggingService.log(assignment.nom, 'deleted');
    return this.http.delete(`${this.uri}/${assignment._id}`, { responseType: 'text' });
  }

  createAssignment(assignment: Assignment): Observable<any> {
    return this.http.post(this.uri, assignment);
  }

  getAssignment(id: string): Observable<any> {
    return this.http.get(`${this.uri}/${id}`);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    assignment.rendu = true;
    return this.http.put<Assignment>(this.uri,assignment)
  }

  getAssignmentsPagine(page: number): Observable<any> {
    return this.http.get(`${this.uri}/page/${page}`);
  }
}
