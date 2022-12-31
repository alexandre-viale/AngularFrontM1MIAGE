import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/models/assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';

@Component({
 selector: 'app-edit-assignment',
 templateUrl: './edit-assignment.component.html',
 styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
 assignment!: Assignment | undefined;
 nomAssignment!: string;
 dateRendu!: Date;

 constructor(
   private assignmentsService: AssignmentsService,
   private route: ActivatedRoute,
   private router: Router, 
   private _snackBar: MatSnackBar
 ) {}

 ngOnInit(): void {
   this.getAssignment();
 }
 getAssignment() {
  const id = this.route.snapshot.params['id'];
 
  this.assignmentsService.getAssignment(id).subscribe((assignment) => {
    console.log('assignment:', assignment);
    if (!assignment) return;
    this.assignment = assignment;
    this.nomAssignment = assignment.nom;
    this.dateRendu = assignment.dateRendu;
  });
}
onSaveAssignment() {
  if (!this.assignment) return;
  this.assignment.nom = this.nomAssignment;
  this.assignment.dateRendu = this.dateRendu.toISOString();
  this.assignmentsService
    .updateAssignment(this.assignment)
    .subscribe((message) => {
      console.log(message);
      this.router.navigate(['/home']);
      this._snackBar.open("Devoir édité avec succès", "Fermer");
    });
}
}



