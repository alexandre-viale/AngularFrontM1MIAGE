import { Component, Inject, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { DatePipe } from '@angular/common'
import { Assignment } from '../models/assignment.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
    private datePipe: DatePipe, private dialog: MatDialog) { }
  
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
  deleteAssignment(assignment: Assignment) {
    this.assignmentsService.deleteAssignment(assignment)
    .subscribe(() => {
      this.getAssignments(this.page, this.limit);
    });
  }
  openDeleteDialog(assignment: Assignment) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {name: assignment.nom}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAssignment(assignment);
      }
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

@Component({
  selector: 'app-delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}