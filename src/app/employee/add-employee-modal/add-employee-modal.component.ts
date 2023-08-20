import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.scss'],
})
export class AddEmployeeModalComponent {
  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.formBuilder.group({
      empName: ['', Validators.required],
      empEmail: ['', [Validators.required, Validators.email]],
      empPhone: [
        '',
        [Validators.required, Validators.pattern(/^(011|012|010)\d{8}$/)],
      ],
      empAddress: ['', Validators.required],
    });
  }

  @Output() getEmployees: EventEmitter<void> = new EventEmitter<void>();

  // Function to trigger the getEmployees event
  triggerGetEmployees() {
    this.getEmployees.emit();
  }
  //**********form validation functions*******
  isValidControl(name: string): boolean {
    return this.employeeForm.controls[name].valid;
  }

  isInValidAndTouched(name: string): boolean {
    return (
      this.employeeForm.controls[name].invalid &&
      (this.employeeForm.controls[name].dirty ||
        this.employeeForm.controls[name].touched)
    );
  }

  isControlHasError(name: string, error: string): boolean {
    return (
      this.employeeForm.controls[name].invalid &&
      this.employeeForm.controls[name].errors?.[error]
    );
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      // Perform the necessary actions to add the employee
      console.log(this.employeeForm.value);
      this.employeeService.post(this.employeeForm.value).subscribe(
        (response) => {
          this.getEmployees.emit();
          this.employeeForm.reset();
          const closeBtn = document.getElementById('closeModal');
          if (closeBtn) closeBtn.click();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }
}
