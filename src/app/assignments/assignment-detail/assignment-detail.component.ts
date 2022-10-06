import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmitted!: any;
  constructor(private assignmentsService : AssignmentsService) { }

  ngOnInit(): void {
  }
  onAssignmentSent() {
    this.assignmentsService.updateAssignment(this.assignmentTransmitted).subscribe();
  }
  onAssignmentDeleted() {
    this.assignmentsService.deleteAssignment(this.assignmentTransmitted).subscribe();
    this.assignmentTransmitted = undefined;
  }
}
