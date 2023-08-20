import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { AddEmployeeModalComponent } from './add-employee-modal/add-employee-modal.component';
import { EditEmployeeModalComponent } from './edit-employee-modal/edit-employee-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    EmployeeComponent,
    AddEmployeeModalComponent,
    EditEmployeeModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    EmployeeRoutingModule,
    MatPaginatorModule,
    MatTableModule,
  ],
})
export class EmployeeModule {}
