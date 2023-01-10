import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { DatePipe } from '@angular/common'
import { Assignment } from '../models/assignment.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SubjectsService } from '../shared/subject.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../shared/users.service';
import { AuthService } from '../shared/auth.service';
import { User } from '../models/user.model';
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
  columnsToDisplay: string[] = ['nom', 'dateRendu', 'rendu'];
  columnsToDisplayWithExpand: string[] = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Assignment | null;
  expandedSubjectName!: string;
  expandedSubjectPreview!: string;
  expandedSubjectTeacherName!: string;
  expandedSubjectTeacherPreview!: string;
  expandedSubjectOwnerName!: string;
  expandedSubjectOwnerPreview!: string;
  expandedOwner!: User;
  finishedFetching = false;
  dataSource!: MatTableDataSource<Assignment>;
  displayRendu: boolean = false;
  nameFilter: string = '';
  sortDirection: number = 0;
  sortName: string = '';
  
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private assignmentsService: AssignmentsService, private subjectsService: SubjectsService, private usersService: UsersService, private  datePipe: DatePipe, private dialog: MatDialog, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.getAssignments(this.page, this.limit);
  }

  paginatorChanged(event: any) {
    this.getAssignments(event.pageIndex + 1, event.pageSize);
  }

  getAssignments(page: number, limit: number) {
    this.assignmentsService.getAssignmentsPaginated(page, limit, {field: this.sortName, direction: this.sortDirection}, {rendu: this.displayRendu, nom: this.nameFilter})
    .subscribe(data => {
      this.dataSource = new MatTableDataSource<Assignment>(data.docs);
      this.dataSource.sort = this.sort;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      this.finishedFetching = true;
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
  isLogged() {
    return this.authService.isLogged();
  }
  isAdmin() {
    return this.authService.isAdmin();
  }
  getSubject(id: string){
    this.subjectsService.getSubject(id).subscribe(subject => {
      this.expandedSubjectName = subject.name;
      this.expandedSubjectPreview = subject.preview;
      this.getUser(subject.teacher);
    });
  }

  getOwner(id: string){
    this.usersService.getUser(id).subscribe(user => {
      this.expandedSubjectOwnerName = user.username;
      this.expandedSubjectOwnerPreview = user.preview;
    });
  }

  getUser(id: string){
    this.usersService.getUser(id).subscribe(user =>{
      this.expandedSubjectTeacherName = user.username;
      this.expandedSubjectTeacherPreview = user.preview;
    });
  }
  
  toggleRendu() {
    this.displayRendu = !this.displayRendu;
    this.getAssignments( 0, this.limit);
  }

  onSort(event: any) {
    this.sortName = event.active;
    if(event.direction === '')
      this.sortDirection = 0;
    else
      this.sortDirection = event.direction === 'asc' ? 1 : -1;
    this.getAssignments(this.page, this.limit);
  }

  displayDate(date: string) {
    try{
      return this.datePipe.transform(date, 'dd/MM/yyyy');
    }catch{
      return date;
    }
  }
  nameFilterChanged() {
    this.getAssignments(this.page, this.limit);
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