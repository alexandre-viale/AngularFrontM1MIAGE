import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Assignment } from 'src/app/models/assignment.model';
import { Subject } from 'src/app/models/subject.model';
import { SubjectsService } from 'src/app/shared/subject.service';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  dateRendu!:Date;

  subjects: Subject[] = [];

  constructor(private assignmentsService : AssignmentsService, private subjectsService : SubjectsService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects() {
    this.subjectsService.getSubjects()
    .subscribe(subjects => {
      this.subjects = subjects;
      subjects.forEach(s => console.log("subject : " + s));
    });
  }

  onSubmit(nom:string, subject:Subject) {
    const newAssignment = new Assignment();
    newAssignment.nom = nom;
    newAssignment.dateRendu = this.dateRendu.toISOString();
    newAssignment.rendu = false;
    newAssignment.subject = subject;
    this.assignmentsService.createAssignment(newAssignment).subscribe((message) => {
      console.log(message);
      this._snackBar.open("Devoir \"" + nom + "\" créé", "Fermer");
    });
  }
}
