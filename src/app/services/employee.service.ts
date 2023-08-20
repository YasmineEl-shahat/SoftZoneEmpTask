import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apiService: ApiService) {}

  getAll() {
    return this.apiService.get(`Employees/getAllEmployees`);
  }
  get(id: number) {
    return this.apiService.getById(`Employees/getEmpByID`, id);
  }
  post(body: any) {
    return this.apiService.post(`Employees/addEmployee`, body);
  }
  patch(body: any) {
    return this.apiService.post(`Employees/editEmployee`, body);
  }
  delete(id: number) {
    return this.apiService.getById(`Employees/deleteEmpByID`, id);
  }
}
