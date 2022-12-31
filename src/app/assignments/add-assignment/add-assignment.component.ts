import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  nomDevoir:string = ""; 
  dateRendu!:Date;

  constructor(private assignmentsService : AssignmentsService, private _snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
  }
  onSubmit(nom:string) {
    const newAssignment = new Assignment();
    newAssignment.nom = nom;
    newAssignment.dateRendu = this.dateRendu.toISOString();
    newAssignment.rendu = false;
    // TODO: Select subject
    this.assignmentsService.createAssignment(newAssignment).subscribe((message) => {
      console.log(message);
      this._snackBar.open("Devoir \"" + nom + "\" créé", "Fermer");
    });
  }
}
