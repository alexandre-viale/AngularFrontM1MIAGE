import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [
    {
      nom: "TP de Java",
      dateDeRendu: new Date("2021-03-01"),
      rendu: true
    }, {
      nom: "TP de React",
      dateDeRendu: new Date("2021-09-28"),
      rendu: false
    }, {
      nom: "TP d'Angular",
      dateDeRendu: new Date("2021-09-22"),
      rendu: true
    },
  ]
  constructor( private loggingService: LoggingService) { }

  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments);
  }
  deleteAssignment(assignment:Assignment): Observable<string> {
    const assginmentPosition = this.assignments.indexOf(assignment);
    this.assignments.splice(assginmentPosition,1);
    this.loggingService.log(assignment.nom, "deleted");
    return of("Assignment deleted");
  }
  createAssignment(assignment:Assignment): Observable<string> {
    this.assignments.push(assignment);
    this.loggingService.log(assignment.nom, "created");
    return of("Assignment created");
  }

  updateAssignment(assignment:Assignment): Observable<string> {
    const index = this.assignments.findIndex((a) => a.nom === assignment.nom);
    this.assignments[index].rendu = true;
    this.loggingService.log(assignment.nom, "updated");
    return of("Assignment updated");
  }
}
