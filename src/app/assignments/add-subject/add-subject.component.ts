import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Subject } from 'src/app/subject.model';
import { SubjectsService } from 'src/app/shared/subject.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  name:string = ""; 
  constructor(private subjectsService : SubjectsService ) {}
  ngOnInit(): void {
  }
  onSubmit(nom:string) {
    const newSubject = new Subject();
    newSubject.nom = nom;
    // TODO: Assign teacher to current user
    this.subjectsService.createSubject(newSubject).subscribe((message) => {
      console.log(message);
    });
  }
}
