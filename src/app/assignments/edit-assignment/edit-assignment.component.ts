import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/models/assignment.model';
import { Subject } from 'src/app/models/subject.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { SubjectsService } from 'src/app/shared/subject.service';

@Component({
 selector: 'app-edit-assignment',
 templateUrl: './edit-assignment.component.html',
 styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
 assignment!: Assignment | undefined;
 nomAssignment!: string;
 dateRendu!: Date;
 subjects: Subject[] = [];
 grade?: number;
 comment?: string;

 constructor(
   private assignmentsService: AssignmentsService,
   private subjectsService: SubjectsService,
   private route: ActivatedRoute,
   private router: Router, 
   private _snackBar: MatSnackBar
 ) {}

  ngOnInit(): void {
    this.getAssignment();
    this.getSubjects();
  }

  getAssignment() {
    const id = this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      console.log('assignment:', assignment);
      if (!assignment) return;
      this.assignment = assignment;
      this.nomAssignment = assignment.nom;
      this.dateRendu = assignment.dateRendu;
      this.grade = assignment.grade;
      this.comment = assignment.comment;
    });
  }

  getSubjects() {
    this.subjectsService.getSubjects()
    .subscribe(subjects => {
      this.subjects = subjects;
    });
  }

  onSaveAssignment(subject:Subject) {
    if (!this.assignment) return;
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateRendu = typeof this.dateRendu === 'string' ? this.dateRendu : this.dateRendu.toISOString();
    this.assignment.subject = subject;
    this.assignment.rendu = this.grade === undefined ? false : true;
    this.assignment.grade = this.grade;
    this.assignment.comment = this.comment;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
        this._snackBar.open("Devoir édité avec succès", "Fermer");
    });
  }
}



