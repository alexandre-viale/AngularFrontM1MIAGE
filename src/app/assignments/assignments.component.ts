import { Component,Input, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { DatePipe } from '@angular/common'
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
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
  ajoutActive = false;
  assignmentSelected : any = undefined;
  assignments : Assignment[] = []
  columnsToDisplay: string[] = ['nom', 'dateRendu', 'rendu'];
  columnsToDisplayWithExpand: string[] = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Assignment | null;
  constructor(private assignmentsService: AssignmentsService,
    public datePipe: DatePipe) { }
  
  ngOnInit(): void {
    this.getAssignments(this.page, this.limit);
  }

  paginatorChanged(event: any) {
    this.getAssignments(event.pageIndex + 1, event.pageSize);
  }

  getAssignments(page: number, limit: number) {
    this.assignmentsService.getAssignmentsPaginated(page, limit)
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
    });
    
  }
  
  displayDate(date: string) {
    try{
      return this.datePipe.transform(date, 'dd/MM/yyyy');
    }catch{
      return date;
    }
  }
}
