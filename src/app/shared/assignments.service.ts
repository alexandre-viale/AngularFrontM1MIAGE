import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Assignment } from '../models/assignment.model';
@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  uri = 'http://localhost:8010/api/assignments';
  httpOptions = {
    headers: new HttpHeaders({
     'Authorization': 'Bearer ' + this.auth.jwtToken,
    }),
   };
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  deleteAssignment(assignment: Assignment): Observable<any> {
    console.log("assignment:", assignment);
    return this.http.delete(`${this.uri}/${assignment._id}`, this.httpOptions);
  }

  createAssignment(assignment: Assignment): Observable<any> {
    return this.http.post(this.uri, assignment, this.httpOptions);
  }

  getAssignment(id: string): Observable<any> {
    return this.http.get(`${this.uri}/${id}`, this.httpOptions);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    assignment.rendu = true;
    return this.http.put<Assignment>(this.uri,assignment, this.httpOptions)
  }

  getAssignmentsPaginated(page: number, limit: number, sort: object = {}, filters: object = {}): Observable<any> {
    return this.http.get(this.uri,{...this.httpOptions, 
      params: {
      page: page.toString(), 
      limit: limit.toString(), 
      sort: JSON.stringify(sort), 
      filters: JSON.stringify(filters)
      }
    });
  }
}
