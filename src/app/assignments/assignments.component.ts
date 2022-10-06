import { Component,Input, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';

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
  assignments:Assignment[] = [
    {
      nom: "TP de Java",
      dateDeRendu: new Date("2021-03-01"),
      rendu: true
    }, {
      nom: "TP de React",
      dateDeRendu: new Date("2021-09-28"),
      rendu: false
    }, {
      nom: "TP d'Angular",
      dateDeRendu: new Date("2021-09-22"),
      rendu: true
    },
  ]
  constructor() { }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000);
  }

  assignmentClick(assignment:Assignment) {
    this.assignmentSelected = assignment;
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

  onDeleteAssignment(assignment:Assignment) {
    this.assignments = this.assignments.filter((a) => a.nom !== assignment.nom);
    this.assignmentSelected = undefined;
  }

  onNewAssignment(assignment:Assignment) {
    this.assignments.push(assignment);
    this.formVisible = false;
  }
 
}
