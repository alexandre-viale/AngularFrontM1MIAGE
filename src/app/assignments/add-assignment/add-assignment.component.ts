import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  nomDevoir:string = ""; 
  dateDeRendu!:Date;
  constructor() {}
  @Output() assignmentAdded = new EventEmitter<Assignment>();
  ngOnInit(): void {
  }
  onSubmit(nom:string) {
    const newAssignment = new Assignment();
    newAssignment.nom = nom;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    this.assignmentAdded.emit(newAssignment);
  }
}
