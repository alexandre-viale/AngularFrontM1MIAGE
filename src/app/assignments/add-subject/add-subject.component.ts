import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { SubjectsService } from 'src/app/shared/subject.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'src/app/models/subject.model';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  name:string = ""; 
  constructor(private subjectsService : SubjectsService, private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
  }
  onSubmit(nom:string) {
    const newSubject = new Subject();
    newSubject.name = nom;
    // TODO: Assign teacher to current user
    this.subjectsService.createSubject(newSubject).subscribe((message) => {
      console.log(message);
      this._snackBar.open("Matière \"" + nom + "\" créée", "Fermer");
    });
  }
}
