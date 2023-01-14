import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { SubjectsService } from 'src/app/shared/subject.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'src/app/models/subject.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  preview: string | undefined;
  constructor(private subjectsService: SubjectsService, private authService: AuthService, private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
  }
  onSubmit(nom:string) {
    const newSubject = new Subject();
    newSubject.name = nom;
    newSubject.teacher = this.authService.currentUser;
    newSubject.preview = this.preview;
    this.subjectsService.createSubject(newSubject).subscribe((message) => {
      this._snackBar.open("Matière \"" + nom + "\" créée", "Fermer");
    });
  }
}
