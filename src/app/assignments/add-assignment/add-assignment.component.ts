import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Assignment } from 'src/app/models/assignment.model';
import { Subject } from 'src/app/models/subject.model';
import { SubjectsService } from 'src/app/shared/subject.service';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  subjects: Subject[] = [];

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  constructor(
    private assignmentsService : AssignmentsService, 
    private subjectsService : SubjectsService, 
    private _snackBar: MatSnackBar, 
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects() {
    this.subjectsService.getSubjects()
    .subscribe(subjects => {
      this.subjects = subjects;
    });
  }

  onSubmit(nom:string, dateRendu:string, subject:Subject) {
    const newAssignment = new Assignment();
    newAssignment.nom = nom;
    newAssignment.dateRendu = dateRendu;
    newAssignment.rendu = false;
    newAssignment.subject = subject;
    this.assignmentsService.createAssignment(newAssignment).subscribe(() => {
      this._snackBar.open("Devoir \"" + nom + "\" créé", "Fermer");
      this.router.navigate(['']);
    });
  }
}
