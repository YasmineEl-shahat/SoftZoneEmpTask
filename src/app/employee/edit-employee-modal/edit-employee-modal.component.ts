import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  styleUrls: ['./edit-employee-modal.component.scss'],
})
export class EditEmployeeModalComponent implements OnInit, OnChanges {
  employeeForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  @Output() getEmployees: EventEmitter<void> = new EventEmitter<void>();

  @Input() selectedEmployee: any;

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(): void {
    if (this.selectedEmployee) {
      this.initializeForm();
    }
  }
  initializeForm(): void {
    this.employeeForm = this.formBuilder.group({
      empName: [this.selectedEmployee?.empName || '', Validators.required],
      empEmail: [
        this.selectedEmployee?.empEmail || '',
        [Validators.required, Validators.email],
      ],
      empPhone: [
        this.selectedEmployee?.empPhone || '',
        [Validators.required, Validators.pattern(/^(011|012|010)\d{8}$/)],
      ],
      empAddress: [
        this.selectedEmployee?.empAddress || '',
        Validators.required,
      ],
    });
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
      this.employeeService
        .patch({
          empId: this.selectedEmployee.empId,
          ...this.employeeForm.value,
        })
        .subscribe(
          (response) => {
            this.getEmployees.emit();
            this.employeeForm.reset();
            const closeBtn = document.getElementById('closeEditModal');
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
