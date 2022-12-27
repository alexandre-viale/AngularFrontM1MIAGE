import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  nomDevoir:string = ""; 
  dateDeRendu!:Date;
  constructor(private assignmentsService : AssignmentsService ) {}
  ngOnInit(): void {
  }
  onSubmit(nom:string) {
    const newAssignment = new Assignment();
    newAssignment.nom = nom;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    // TODO: Select subject
    this.assignmentsService.createAssignment(newAssignment).subscribe((message) => {
      console.log(message);
      });
  }
}
