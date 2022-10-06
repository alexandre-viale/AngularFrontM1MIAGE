import { Component,Input, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = 'Mon application sur les assignments !'
  ajoutActive = false;
  formVisible = false;
  assignmentSelected : any = undefined;
  assignments : Assignment[] = []
  constructor(private assignmentsService: AssignmentsService) { }
  
  ngOnInit(): void {
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments;
    });
  }

  assignmentClick(assignment:Assignment) {
    this.assignmentSelected = assignment;
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

  onNewAssignment(assignment:Assignment) {
    this.assignmentsService.createAssignment(assignment).subscribe();
    this.formVisible = false;
  }
 
}
