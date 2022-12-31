import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

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
   private router: Router
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
  this.assignment.dateRendu = typeof this.dateRendu === 'string' ? this.dateRendu : this.dateRendu.toISOString();
  this.assignmentsService
    .updateAssignment(this.assignment)
    .subscribe((message) => {
      console.log(message);
      this.router.navigate(['/home']);
    });
}
}



