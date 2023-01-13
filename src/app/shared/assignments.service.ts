import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Assignment } from '../models/assignment.model';
@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  uri = 'https://backm1miage.onrender.com/api/assignments';
  httpOptions = {
    headers: new HttpHeaders({
     'Authorization': 'Bearer ' + localStorage.getItem('token'),
     'Access-Control-Allow-Origin': '*'
    }),
   };
  constructor(
    private http: HttpClient,
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
