import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { RouterModule, Routes } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginPageComponent } from './assignments/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AddSubjectComponent } from './assignments/add-subject/add-subject.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
const appRoutes: Routes = [
  { path: 'home', component: AssignmentsComponent, canActivate: [AuthGuard] },
  {
    path: 'add/assignment',
    component: AddAssignmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add/subject',
    component: AddSubjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'assignment/:id',
    component: AssignmentDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LoginPageComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    AddSubjectComponent,
    EditAssignmentComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatCheckboxModule,
    RouterModule.forRoot(appRoutes),
    MatSlideToggleModule,
    MatSnackBarModule,
    HttpClientModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
