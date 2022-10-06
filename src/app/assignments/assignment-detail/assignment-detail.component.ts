import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmitted!:Assignment;
  @Output() deleteAssignment = new EventEmitter<Assignment>();
  constructor() { }

  ngOnInit(): void {
  }
  onAssignmentSent() {
    this.assignmentTransmitted.rendu = true;
  }
  onAssignmentDeleted() {
    this.deleteAssignment.emit(this.assignmentTransmitted);
  }
}
