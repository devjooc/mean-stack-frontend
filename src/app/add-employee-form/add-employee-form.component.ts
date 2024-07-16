import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {EmployeeService} from "../employee/employee.service";
import {Employee} from "../employee/employee";
import {EmployeeFormComponent} from "../employee-form/employee-form.component";

@Component({
    selector: 'app-add-employee-form',
    standalone: true,
    imports: [
        NgIf,
        EmployeeFormComponent
    ],
    templateUrl: './add-employee-form.component.html',
    styles: ``
})
export class AddEmployeeFormComponent {

    // error message flag
    protected showErrMsg = false;
    protected errMsg!: string;

    constructor(private router: Router, private service: EmployeeService) {
    }

    protected addEmployee(employee: Employee) {
        this.service.createEmployee(employee).subscribe({
                next: () => {
                    this.router.navigate(['/employees']);
                },
                error: (error) => {
                    this.showErrMsg = true;
                    this.errMsg = `unable to add new employee. error: ${error.message}`;
                    console.error(error);
                }
            }
        )
    }
}
