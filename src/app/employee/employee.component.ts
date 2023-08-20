import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EditEmpViewModel } from '../models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeComponent implements OnInit {
  employees: EditEmpViewModel[] | any = [];
  loading = true;
  pageSize = 10;
  currentPage: number = 0;

  sortColumn = 'empName';
  sortOrder = 'desc';
  isAllSelected: boolean = false;
  selectedEmployeeToEdit: EditEmpViewModel | any;
  selectedEmployeeToDelete: EditEmpViewModel | any = null;
  selectedEmployees: EditEmpViewModel[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.loading = true;
    this.employeeService.getAll().subscribe(
      (response: EditEmpViewModel[] | any) => {
        this.employees = response.reverse();
        if (this.employees.length <= 10) this.currentPage = 0;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  sort(column: string): void {
    this.sortColumn = column;
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';

    this.employees.sort((a: any, b: any) => {
      if (this.sortOrder === 'asc') {
        if (a[column][0] < b[column][0]) return -1;
        if (a[column][0] > b[column][0]) return 1;
      } else {
        if (a[column][0] > b[column][0]) return -1;
        if (a[column][0] < b[column][0]) return 1;
      }
      return 0;
    });
  }

  pageChanged(page: number): void {
    this.currentPage = page;
  }

  toggleSelected(employee: EditEmpViewModel) {
    if (
      employee.selected &&
      !this.selectedEmployees.some((obj) => obj.empId === employee.empId)
    )
      this.selectedEmployees.push(employee);
    else if (
      !employee.selected &&
      this.selectedEmployees.some((obj) => obj.empId === employee.empId)
    ) {
      this.selectedEmployees = this.selectedEmployees.filter(
        (emp) => emp.empId !== employee.empId
      );
    }
  }
  selectEmployee(employee: EditEmpViewModel): void {
    if (employee.selected) employee.selected = false;
    else employee.selected = true;
    this.toggleSelected(employee);
  }

  selectAll(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    for (let i = startIndex; i < endIndex && i < this.employees.length; i++) {
      this.employees[i].selected = true;
      this.toggleSelected(this.employees[i]);
    }
  }

  deselectAll(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    for (let i = startIndex; i < endIndex && i < this.employees.length; i++) {
      this.employees[i].selected = false;
      this.toggleSelected(this.employees[i]);
    }
  }

  deleteEmployee(id: number): void {
    this.employeeService.delete(id).subscribe(
      (response) => {
        this.getEmployees();
        this.selectedEmployeeToDelete = null;
        const closeBtn = document.getElementById('closeDeleteModal');
        if (closeBtn) closeBtn.click();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async deleteSelected() {
    // this.selectedEmployees = this.employees.filter(
    //   (employee: EditEmpViewModel) => employee.selected
    // );

    if (this.selectedEmployees.length === 0) {
      return;
    }

    try {
      for (const employee of this.selectedEmployees) {
        await this.employeeService.delete(employee.empId).toPromise();
      }
      this.isAllSelected = false;
      this.selectedEmployees = [];
      this.getEmployees();
      const closeBtn = document.getElementById('closeDeleteModal');
      if (closeBtn) closeBtn.click();
    } catch (error) {
      console.error(error);
    }
  }
}
