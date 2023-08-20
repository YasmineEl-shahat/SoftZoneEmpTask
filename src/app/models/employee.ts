export class EmpViewModel {
  empName: string;
  empEmail: string;
  empAddress: string;
  empPhone: string;
  constructor(
    empName: string,
    empEmail: string,
    empAddress: string,
    empPhone: string
  ) {
    this.empName = empName;
    this.empEmail = empEmail;
    this.empAddress = empAddress;
    this.empPhone = empPhone;
  }
}
export class EditEmpViewModel {
  empId: number;
  empName: string;
  empEmail: string;
  empAddress: string;
  empPhone: string;
  selected: boolean = false;

  constructor(
    empId: number,
    empName: string,
    empEmail: string,
    empAddress: string,
    empPhone: string
  ) {
    this.empId = empId;
    this.empName = empName;
    this.empEmail = empEmail;
    this.empAddress = empAddress;
    this.empPhone = empPhone;
  }
}
