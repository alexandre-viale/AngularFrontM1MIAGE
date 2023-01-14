import { Component, Input, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmitted!: any;
  constructor(private assignmentsService : AssignmentsService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmitted = assignment;
    });
  }

  onAssignmentSent() {
    this.assignmentsService.updateAssignment(this.assignmentTransmitted).subscribe((message) => {
      this.router.navigate(['/']);
    });
  }

  onAssignmentDeleted() {
    this.assignmentsService.deleteAssignment(this.assignmentTransmitted).subscribe(() => {
      this.assignmentTransmitted = undefined;
      this.router.navigate(['/']);
    });
  }

  onClickEdit() {
    this.router.navigate(['/assignment',this.assignmentTransmitted._id,'edit'],
    {queryParams: {nom: this.assignmentTransmitted.nom}, fragment: 'edition'});
  }
 
  isAdmin() {
    return this.authService.isAdmin();
  }

}
