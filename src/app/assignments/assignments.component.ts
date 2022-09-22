import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = 'Mon application sur les assignments !'
  ajoutActive = false;
  nomDevoir:string = ""; 
  dateDeRendu!:Date;
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

  onSubmit(nom:string) {
    const newAssignment = new Assignment();
    newAssignment.nom = nom;
    console.log(this.dateDeRendu);
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    this.assignments.push(newAssignment);
  }
 
}
