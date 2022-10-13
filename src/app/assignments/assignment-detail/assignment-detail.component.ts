import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmitted!: any;
  constructor(private assignmentsService : AssignmentsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getAssignment()
  }

  getAssignment() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmitted = assignment;
      console.log(assignment);
    });
  }

  onAssignmentSent() {
    this.assignmentsService.updateAssignment(this.assignmentTransmitted).subscribe();
    this.router.navigate(['/home']);
  }
  onAssignmentDeleted() {
    this.assignmentsService.deleteAssignment(this.assignmentTransmitted).subscribe();
    this.assignmentTransmitted = undefined;
    this.router.navigate(['/home']);
  }

  onClickEdit() {
    this.router.navigate(['/assignment',this.assignmentTransmitted.id, 'edit'],
    {queryParams: {nom: this.assignmentTransmitted.nom}, fragment: 'edition'});
  }
  
}
