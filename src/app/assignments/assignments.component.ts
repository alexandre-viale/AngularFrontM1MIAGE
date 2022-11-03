import { Component,Input, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  page: number=1;
  limit: number=10;
  totalDocs!: number;
  totalPages!: number;
  hasPrevPage!: boolean;
  prevPage!: number;
  hasNextPage!: boolean;
  nextPage!: number; 
  titre = 'Mon application sur les assignments !'
  ajoutActive = false;
  formVisible = false;
  assignmentSelected : any = undefined;
  assignments : Assignment[] = []
  constructor(private assignmentsService: AssignmentsService) { }
  
  ngOnInit(): void {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
     .subscribe(data => {
       this.assignments = data.docs;
       this.page = data.page;
       this.limit = data.limit;
       this.totalDocs = data.totalDocs;
       this.totalPages = data.totalPages;
       this.hasPrevPage = data.hasPrevPage;
       this.prevPage = data.prevPage;
       this.hasNextPage = data.hasNextPage;
       this.nextPage = data.nextPage;
       console.log("données reçues");
     });

    
  }

  assignmentClick(assignment:Assignment) {
    this.assignmentSelected = assignment;
  }
 
}
